// App: Full-Stack Application
// Package: api
// File: src/customers/entities/customer.entity.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: TypeORM entity representing the customer table with related email and phone entities.
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CustomerEmail } from "./customer-email.entity";
import { CustomerPhoneNumber } from "./customer-phone-number.entity";
import { PostalAddress } from "./postal-address.entity";
import { PrivacySettings } from "./privacy-settings.entity";

@Entity("customer")
export class Customer {
  @PrimaryColumn("uuid", { name: "customer_id" })
  id!: string;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column("varchar", { name: "middle_name", nullable: true })
  middleName?: string | null;

  @Column({ name: "last_name" })
  lastName!: string;

  @ManyToOne(() => PostalAddress, { nullable: true })
  @JoinColumn({ name: "address_id" })
  address?: PostalAddress | null;

  @ManyToOne(() => PrivacySettings, { nullable: false, cascade: true })
  @JoinColumn({ name: "privacy_settings_id" })
  privacySettings!: PrivacySettings;

  @OneToMany(() => CustomerEmail, (email) => email.customer, { cascade: true })
  emails?: CustomerEmail[];

  @OneToMany(() => CustomerPhoneNumber, (phone) => phone.customer, {
    cascade: true,
  })
  phoneNumbers?: CustomerPhoneNumber[];

  // @Column({ name: 'is_deleted', default: false })
  // isDeleted?: boolean;
}
