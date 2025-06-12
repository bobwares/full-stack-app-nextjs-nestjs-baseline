// App: Full-Stack Application
// Package: api
// File: src/customers/entities/postal-address.entity.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: Entity representing postal addresses for customers.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("postal_address")
export class PostalAddress {
  @PrimaryGeneratedColumn({ name: "address_id" })
  id!: number;

  @Column()
  line1!: string;

  @Column("varchar", { nullable: true })
  line2?: string | null;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column("varchar", { name: "postal_code", nullable: true })
  postalCode?: string | null;

  @Column()
  country!: string;
}
