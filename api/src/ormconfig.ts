//  App: Initial Full-Stack Application
//  Package: api
//  File: src/ormconfig.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T15:17:19Z
//  Description: TypeORM configuration loaded from environment variables.
// 
import { DataSource, DataSourceOptions } from 'typeorm';
import { Customer } from './customers/customer.entity';

envLoad();

const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL as string,
  entities: [Customer],
  migrations: ['dist/migrations/*.js'],
};

export const AppDataSource = new DataSource(options);

function envLoad() {
  if (!process.env.DATABASE_URL) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: '../db/.env.example' });
  }
}
