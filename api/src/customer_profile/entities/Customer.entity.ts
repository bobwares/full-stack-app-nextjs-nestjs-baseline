/* ============================================================
 * File: api/src/customer_profile/entities/Customer.entity.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: Customer entity mapped from JSON Schema definition.
 * ============================================================ */

import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { PostalAddress } from './PostalAddress.entity';
import { PrivacySettings } from './PrivacySettings.entity';
import { CustomerEmail } from './CustomerEmail.entity';
import { CustomerPhoneNumber } from './CustomerPhoneNumber.entity';

@Entity({ name: 'customer', schema: 'customer_profile' })
@Index(['addressId'])
@Index(['privacySettingsId'])
export class Customer {
  @PrimaryColumn('uuid', { name: 'customer_id' })
  customerId!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ name: 'middle_name', type: 'varchar', length: 255, nullable: true })
  middleName?: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName!: string;

  /* ---------- Foreign-key columns ---------- */
  @Column({ name: 'address_id', type: 'integer', nullable: true })
  addressId?: number;

  @Column({ name: 'privacy_settings_id', type: 'integer', nullable: true })
  privacySettingsId?: number;

  /* ---------- Relations ---------- */
  @ManyToOne(() => PostalAddress, (address) => address.customers, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'address_id' })
  postalAddress?: PostalAddress;

  @ManyToOne(() => PrivacySettings, (ps) => ps.customers, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'privacy_settings_id' })
  privacySettings?: PrivacySettings;

  @OneToMany(() => CustomerEmail, (email) => email.customer)
  emails!: CustomerEmail[];

  @OneToMany(() => CustomerPhoneNumber, (phone) => phone.customer)
  phoneNumbers!: CustomerPhoneNumber[];
}
