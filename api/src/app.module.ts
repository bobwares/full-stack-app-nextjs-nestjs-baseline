// App: Initial Full-Stack Application
// Package: api
// File: app.module.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: Root module configuring TypeORM and feature modules.
// 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import ormConfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CustomersModule],
})
export class AppModule {}

