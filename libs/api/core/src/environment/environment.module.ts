import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentProvider } from './environment.provider';

@Module({
  // imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: EnvironmentProvider,
      useFactory: () => EnvironmentProvider.asyncInit(),
    },
  ],
})
export class EnvironmentModule {}
