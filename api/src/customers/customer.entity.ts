// App: Initial Full-Stack Application
// Package: api
// File: customer.entity.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: TypeORM entity for customer profile.
// 
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer_profile')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'marketing_emails_enabled' })
  marketingEmailsEnabled!: boolean;

  @Column({ name: 'two_factor_enabled' })
  twoFactorEnabled!: boolean;
}

