//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.entity.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: TypeORM entity representing a customer record.
// 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName!: string;

  @Column('simple-array')
  emails!: string[];

  @Column('jsonb', { nullable: true })
  phoneNumbers?: { type: string; number: string }[];

  @Column('jsonb', { nullable: true })
  address?: Record<string, unknown>;

  @Column('jsonb')
  privacySettings!: { marketingEmailsEnabled: boolean; twoFactorEnabled: boolean };
}
