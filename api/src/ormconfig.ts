/* ============================================================
 * File: api/src/ormconfig.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: TypeORM configuration using environment variables.
 * ============================================================ */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from './customer_profile/entities/Customer.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Environment variable DATABASE_URL must be defined');
}

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: databaseUrl,
  entities: [Customer],
};

export default ormConfig;
