// App: Initial Full-Stack Application
// Package: api
// File: src/customers/entities/postal-address.entity.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: TypeORM entity representing postal address details.
//
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('postal_address')
export class PostalAddress {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  id!: number;

  @Column({ name: 'line1' })
  line1!: string;

  @Column({ name: 'line2', nullable: true })
  line2?: string;

  @Column({ name: 'city' })
  city!: string;

  @Column({ name: 'state' })
  state!: string;

  @Column({ name: 'postal_code' })
  postalCode!: string;

  @Column({ name: 'country' })
  country!: string;
}
