//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.module.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Module encapsulating customer profile entities and service.
//
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerEmail } from './customer-email.entity';
import { CustomerPhoneNumber } from './customer-phone-number.entity';
import { CustomerAddress } from './customer-address.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile, CustomerEmail, CustomerPhoneNumber, CustomerAddress])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
