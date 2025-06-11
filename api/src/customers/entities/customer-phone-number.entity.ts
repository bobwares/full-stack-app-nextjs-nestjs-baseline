// App: Initial Full-Stack Application
// Package: api
// File: src/customers/entities/customer-phone-number.entity.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: TypeORM entity for phone numbers associated with a customer.
//
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_phone_number')
export class CustomerPhoneNumber {
  @PrimaryGeneratedColumn({ name: 'phone_id' })
  id!: number;

  @Column()
  type!: string;

  @Column()
  number!: string;

  @ManyToOne(() => Customer, (customer) => customer.phoneNumbers, { onDelete: 'CASCADE' })
  customer!: Customer;
}
