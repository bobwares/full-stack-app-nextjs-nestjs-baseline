/* ============================================================
 * File: api/src/customer_profile/entities/PrivacySettings.entity.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: PrivacySettings entity mapped from JSON Schema definition.
 * ============================================================ */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Customer } from './Customer.entity';

@Entity({ name: 'privacy_settings', schema: 'customer_profile' })
export class PrivacySettings {
  @PrimaryGeneratedColumn({ name: 'privacy_settings_id', type: 'integer' })
  privacySettingsId!: number;

  @Column({ name: 'marketing_emails_enabled', type: 'boolean' })
  marketingEmailsEnabled!: boolean;

  @Column({ name: 'two_factor_enabled', type: 'boolean' })
  twoFactorEnabled!: boolean;

  /* ---------- Reverse relations ---------- */
  @OneToMany(() => Customer, (customer) => customer.privacySettings)
  customers!: Customer[];
}
