// App: Initial Full-Stack Application
// Package: api
// File: src/customers/entities/customer.entity.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: TypeORM entity representing a customer and its relations.
//
import { Column, Entity, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { PostalAddress } from './postal-address.entity';
import { PrivacySettings } from './privacy-settings.entity';
import { CustomerEmail } from './customer-email.entity';
import { CustomerPhoneNumber } from './customer-phone-number.entity';

@Entity('customer')
export class Customer {
  @PrimaryColumn({ name: 'customer_id', type: 'uuid' })
  id!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @ManyToOne(() => PostalAddress, { cascade: true, eager: true })
  @JoinColumn({ name: 'address_id' })
  address!: PostalAddress;

  @ManyToOne(() => PrivacySettings, { cascade: true, eager: true })
  @JoinColumn({ name: 'privacy_settings_id' })
  privacySettings!: PrivacySettings;

  @OneToMany(() => CustomerEmail, (email) => email.customer, { cascade: true, eager: true })
  emails!: CustomerEmail[];

  @OneToMany(() => CustomerPhoneNumber, (phone) => phone.customer, { cascade: true, eager: true })
  phoneNumbers!: CustomerPhoneNumber[];
}
