// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer-profile.entity.ts
// Version: 0.0.4
// Author: Bobwares
// Date: 2025-06-10T00:00:00Z
// Description: TypeORM entity representing the customer profile root record.
//
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CustomerEmail } from './customer-email.entity';
import { CustomerPhoneNumber } from './customer-phone-number.entity';
import { CustomerAddress } from './customer-address.entity';

@Entity({ name: 'customer_profile' })
export class CustomerProfile {
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

  @OneToMany(() => CustomerEmail, (email) => email.customer, {
    cascade: true,
    eager: true,
  })
  emails!: CustomerEmail[];

  @OneToMany(() => CustomerPhoneNumber, (phone) => phone.customer, {
    cascade: true,
    eager: true,
  })
  phoneNumbers?: CustomerPhoneNumber[];

  @OneToOne(() => CustomerAddress, (address) => address.customer, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'customer_id' })
  address?: CustomerAddress;
}
