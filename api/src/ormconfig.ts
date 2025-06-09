// App: Initial Full-Stack Application
// Package: api
// File: ormconfig.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: Export TypeORM configuration loaded from environment variables.
// 
import { DataSourceOptions } from 'typeorm';
import { Customer } from './customers/customer.entity';

env();

function env() {
  require('dotenv').config({ path: '../db/.env' });
}

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'customer_db',
  entities: [Customer],
  synchronize: false,
};

export default ormConfig;

