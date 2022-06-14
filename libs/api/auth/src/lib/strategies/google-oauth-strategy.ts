import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ApiAuthService } from '../api-auth.service';

@Injectable()
export class GoogleOauth2Strategy extends PassportStrategy(
  Strategy,
  'google-oauth2'
) {
  constructor(private authService: ApiAuthService) {
    super({
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL,
      scope: ['profile'],
      state: false,
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    try {
      const user = await this.authService.findOrCreateUser({
        token: accessToken,
        provider: profile.provider,
        username: profile.displayName,
        providerId: profile.id,
      });
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
