// App: Initial Full-Stack Application
// Package: api
// File: src/customers/entities/privacy-settings.entity.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: TypeORM entity representing privacy settings for a customer.
//
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privacy_settings')
export class PrivacySettings {
  @PrimaryGeneratedColumn({ name: 'privacy_settings_id' })
  id!: number;

  @Column({ name: 'marketing_emails_enabled' })
  marketingEmailsEnabled!: boolean;

  @Column({ name: 'two_factor_enabled' })
  twoFactorEnabled!: boolean;
}
