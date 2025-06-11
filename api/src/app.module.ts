// App: Full-Stack Application
// Package: api
// File: src/app.module.ts
// Version: 0.1.0
// Author: Bobwares CodeBot
// Date: 2025-06-11
// Description: Root application module configuring environment and database.
//

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customers/customer.module';
import createOrmConfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.APP_ENV || 'local'}`, '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => createOrmConfig(),
    }),
    CustomerModule,
  ],
})
export class AppModule {}
