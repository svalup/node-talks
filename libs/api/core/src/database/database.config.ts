import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import * as entites from './entities'

const dbConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'mssql' | 'mongodb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: Object.values(entites),
  migrations: ['./src/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations/'
  },
  synchronize: false,
  autoLoadEntities: false,
  migrationsRun: false
};

export default dbConfig;