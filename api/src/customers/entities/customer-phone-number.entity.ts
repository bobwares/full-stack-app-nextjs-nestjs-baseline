// App: Full-Stack Application
// Package: api
// File: src/customers/entities/customer-phone-number.entity.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: Entity for customer_phone_number table storing phone numbers per customer.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_phone_number')
export class CustomerPhoneNumber {
  @PrimaryGeneratedColumn({ name: 'phone_id' })
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.phoneNumbers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column()
  type!: string;

  @Column()
  number!: string;
}
