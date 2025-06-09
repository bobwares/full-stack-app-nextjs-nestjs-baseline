# App: Initial Full-Stack Application
# Package: api
# File: 20250609123000_create_customers_table.ts
# Version: 2.0.29
# Author: Bobwares
# Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
# Description: Migration to create customer_profile table.
#
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCustomersTable20250609123000 implements MigrationInterface {
  name = 'createCustomersTable20250609123000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customer_profile (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name text NOT NULL,
      middle_name text,
      last_name text NOT NULL,
      marketing_emails_enabled boolean NOT NULL,
      two_factor_enabled boolean NOT NULL
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS customer_profile');
  }
}

