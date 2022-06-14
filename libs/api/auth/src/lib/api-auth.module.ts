import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { GoogleOauth2Strategy } from './strategies/google-oauth-strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [ApiAuthController],
  providers: [ApiAuthService, GoogleOauth2Strategy],
  exports: [ApiAuthService, GoogleOauth2Strategy],
})
export class ApiAuthModule {}
