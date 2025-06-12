// App: Full-Stack Application
// Package: api
// File: src/customers/entities/privacy-settings.entity.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: Privacy settings entity storing marketing and 2FA options.
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('privacy_settings')
export class PrivacySettings {
  @PrimaryGeneratedColumn({ name: 'privacy_settings_id' })
  id!: number;

  @Column({ name: 'marketing_emails_enabled' })
  marketingEmailsEnabled!: boolean;

  @Column({ name: 'two_factor_enabled' })
  twoFactorEnabled!: boolean;
}
