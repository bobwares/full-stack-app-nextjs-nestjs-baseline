// App: Full-Stack Application
// Package: api
// File: src/customers/customers.module.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: Customers feature module configuring repository and service for persistence.
//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { CustomerEmail } from './entities/customer-email.entity';
import { CustomerPhoneNumber } from './entities/customer-phone-number.entity';
import { PostalAddress } from './entities/postal-address.entity';
import { PrivacySettings } from './entities/privacy-settings.entity';
import { CustomersRepository } from './customers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerEmail, CustomerPhoneNumber, PostalAddress, PrivacySettings]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository],
  exports: [CustomersRepository],
})
export class CustomersModule {}
