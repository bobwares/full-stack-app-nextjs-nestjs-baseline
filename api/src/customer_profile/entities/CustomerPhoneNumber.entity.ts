/* ============================================================
 * File: api/src/customer_profile/entities/CustomerPhoneNumber.entity.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: CustomerPhoneNumber entity mapped from JSON Schema definition.
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

@Entity({ name: 'customer_phone_number', schema: 'customer_profile' })
@Unique('UQ_customer_phone_number', ['customerId', 'number'])
@Index('IDX_customer_phone_customer', ['customerId'])
export class CustomerPhoneNumber {
  @PrimaryGeneratedColumn({ name: 'phone_id', type: 'integer' })
  phoneId!: number;

  @Column('uuid', { name: 'customer_id' })
  customerId!: string;

  @Column({ name: 'type', type: 'varchar', length: 20 })
  type!: string;

  @Column({ name: 'number', type: 'varchar', length: 15 })
  number!: string;

  /* ---------- Relations ---------- */
  @ManyToOne(() => Customer, (customer) => customer.phoneNumbers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;
}
