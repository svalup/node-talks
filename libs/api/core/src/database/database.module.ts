import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig)
  ]
})
export class DatabaseModule {}
