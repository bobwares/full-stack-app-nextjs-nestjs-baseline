// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer-phone-number.entity.ts
// Version: 0.0.4
// Author: Bobwares
// Date: 2025-06-10T00:00:00Z
// Description: TypeORM entity for customer phone numbers.
//
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';

@Entity({ name: 'customer_phone_number' })
export class CustomerPhoneNumber {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => CustomerProfile, (customer) => customer.phoneNumbers, {
    onDelete: 'CASCADE',
  })
  customer!: CustomerProfile;

  @Column()
  type!: string;

  @Column()
  number!: string;
}
