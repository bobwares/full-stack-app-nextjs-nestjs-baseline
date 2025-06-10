// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer-address.entity.ts
// Version: 0.0.4
// Author: Bobwares
// Date: 2025-06-10T00:00:00Z
// Description: TypeORM entity for a customer's postal address.
//
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';

@Entity({ name: 'customer_address' })
export class CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => CustomerProfile, (customer) => customer.address, {
    onDelete: 'CASCADE',
  })
  customer!: CustomerProfile;

  @Column()
  line1!: string;

  @Column({ nullable: true })
  line2?: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column({ name: 'postal_code' })
  postalCode!: string;

  @Column()
  country!: string;
}
