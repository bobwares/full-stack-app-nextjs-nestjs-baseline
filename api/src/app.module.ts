// App: Initial Full-Stack Application
// Package: api
// File: src/app.module.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Root module configuring TypeORM and importing feature modules.
//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customers/customer.module';
import { Customer } from './customers/entities/customer.entity';
import { PostalAddress } from './customers/entities/postal-address.entity';
import { PrivacySettings } from './customers/entities/privacy-settings.entity';
import { CustomerEmail } from './customers/entities/customer-email.entity';
import { CustomerPhoneNumber } from './customers/entities/customer-phone-number.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Customer, PostalAddress, PrivacySettings, CustomerEmail, CustomerPhoneNumber],
      synchronize: true,
    }),
    CustomerModule,
  ],
})
export class AppModule {}
