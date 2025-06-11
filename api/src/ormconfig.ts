// # App: Full-Stack Application
// # Package: api
// # File: src/ormconfig.ts
// # Version: 0.1.0
// # Author: Bobwares CodeBot
// # Date: 2025-06-11
// # Description: Provides TypeORM configuration based on environment variables.
// #
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  Customer,
} from './customers/entities/customer.entity';
import { CustomerEmail } from './customers/entities/customer-email.entity';
import { CustomerPhoneNumber } from './customers/entities/customer-phone-number.entity';
import { PostalAddress } from './customers/entities/postal-address.entity';
import { PrivacySettings } from './customers/entities/privacy-settings.entity';

export function createOrmConfig(): TypeOrmModuleOptions {
  const env = process.env.APP_ENV || 'local';
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Environment variable DATABASE_URL must be defined');
  }

  const isCodex = env === 'codex';

  return {
    type: isCodex ? 'sqlite' : 'postgres',
    ...(isCodex ? { database: databaseUrl } : { url: databaseUrl }),
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      Customer,
      PostalAddress,
      PrivacySettings,
      CustomerEmail,
      CustomerPhoneNumber,
    ],
  };
}

export default createOrmConfig;
