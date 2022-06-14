import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@node-talks/api/core';
import { ApiAuthService } from './api-auth.service';
import { GoogleOauth2Guard } from './guards/google-oauth-guard';

@ApiTags('auth')
@Controller('auth')
export class ApiAuthController {
  constructor(private apiAuthService: ApiAuthService) {}

  @UseGuards(GoogleOauth2Guard)
  @Get('google/login')
  login() {
    return;
  }

  @UseGuards(GoogleOauth2Guard)
  @Get('google/callback')
  callback(@Req() req) {
    return this.apiAuthService.retrieveUserData(req.user);
  }

  @Get('user/:uuid')
  @ApiOkResponse({
    description: 'Get a user by UUID',
    type: User,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Fails to retrieve a user by the provided UUID',
  })
  async getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.apiAuthService.getUser(uuid);
  }
}
