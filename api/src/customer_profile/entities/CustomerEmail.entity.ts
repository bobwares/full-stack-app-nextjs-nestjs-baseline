/* ============================================================
 * File: api/src/customer_profile/entities/CustomerEmail.entity.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: CustomerEmail entity mapped from JSON Schema definition.
 * ============================================================ */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Customer } from './Customer.entity';

@Entity({ name: 'customer_email', schema: 'customer_profile' })
@Unique('UQ_customer_email', ['customerId', 'email'])
@Index('IDX_customer_email_customer', ['customerId'])
export class CustomerEmail {
  @PrimaryGeneratedColumn({ name: 'email_id', type: 'integer' })
  emailId!: number;

  @Column('uuid', { name: 'customer_id' })
  customerId!: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email!: string;

  /* ---------- Relations ---------- */
  @ManyToOne(() => Customer, (customer) => customer.emails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;
}
