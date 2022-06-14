import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@node-talks/api/auth';
import { DatabaseModule, EnvironmentModule } from '@node-talks/api/core';

@Module({
  imports: [
    DatabaseModule,
    EnvironmentModule,
    ApiAuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
