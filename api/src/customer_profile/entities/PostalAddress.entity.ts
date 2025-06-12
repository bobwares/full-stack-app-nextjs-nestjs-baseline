/* ============================================================
 * File: api/src/customer_profile/entities/PostalAddress.entity.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: PostalAddress entity mapped from JSON Schema definition.
 * ============================================================ */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Customer } from './Customer.entity';

@Entity({ name: 'postal_address', schema: 'customer_profile' })
export class PostalAddress {
  @PrimaryGeneratedColumn({ name: 'address_id', type: 'integer' })
  addressId!: number;

  @Column({ name: 'line1', type: 'varchar', length: 255 })
  line1!: string;

  @Column({ name: 'line2', type: 'varchar', length: 255, nullable: true })
  line2?: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city!: string;

  @Column({ name: 'state', type: 'varchar', length: 50 })
  state!: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 20, nullable: true })
  postalCode?: string;

  @Column({ name: 'country', type: 'char', length: 2 })
  country!: string;

  /* ---------- Reverse relations ---------- */
  @OneToMany(() => Customer, (customer) => customer.postalAddress)
  customers!: Customer[];
}
