// App: Full-Stack Application
// Package: api
// File: src/customers/entities/customer-email.entity.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: CustomerEmail entity representing the customer_email table.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_email')
export class CustomerEmail {
  @PrimaryGeneratedColumn({ name: 'email_id' })
  id!: number;

  @ManyToOne(() => Customer, (customer) => customer.emails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column()
  email!: string;
}
