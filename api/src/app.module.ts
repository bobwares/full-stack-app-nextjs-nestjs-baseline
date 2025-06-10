//  App: Initial Full-Stack Application
//  Package: api
//  File: src/app.module.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Root module configuring TypeORM and feature modules.
// 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customers/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CustomerModule,
  ],
})
export class AppModule {}
