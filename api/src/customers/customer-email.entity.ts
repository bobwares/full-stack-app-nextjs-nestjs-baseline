// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer-email.entity.ts
// Version: 0.0.4
// Author: Bobwares
// Date: 2025-06-10T00:00:00Z
// Description: TypeORM entity for customer email addresses.
//
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';

@Entity({ name: 'customer_email' })
export class CustomerEmail {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => CustomerProfile, (customer) => customer.emails, {
    onDelete: 'CASCADE',
  })
  customer!: CustomerProfile;

  @Column()
  email!: string;
}
