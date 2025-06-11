// App: Initial Full-Stack Application
// Package: api
// File: src/customers/entities/customer-email.entity.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: TypeORM entity representing customer email addresses.
//
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_email')
export class CustomerEmail {
  @PrimaryGeneratedColumn({ name: 'email_id' })
  id!: number;

  @Column()
  email!: string;

  @ManyToOne(() => Customer, (customer) => customer.emails, { onDelete: 'CASCADE' })
  customer!: Customer;
}
