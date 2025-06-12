import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerTables1718200000000 implements MigrationInterface {
  name = 'CreateCustomerTables1718200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS postal_address (\n    address_id SERIAL PRIMARY KEY,\n    line1 VARCHAR(255) NOT NULL,\n    line2 VARCHAR(255),\n    city VARCHAR(100) NOT NULL,\n    state VARCHAR(50) NOT NULL,\n    postal_code VARCHAR(20),\n    country CHAR(2) NOT NULL\n)`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS privacy_settings (\n    privacy_settings_id SERIAL PRIMARY KEY,\n    marketing_emails_enabled BOOLEAN NOT NULL,\n    two_factor_enabled BOOLEAN NOT NULL\n)`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customer (\n    customer_id UUID PRIMARY KEY,\n    first_name VARCHAR(255) NOT NULL,\n    middle_name VARCHAR(255),\n    last_name VARCHAR(255) NOT NULL,\n    address_id INT REFERENCES postal_address(address_id),\n    privacy_settings_id INT NOT NULL REFERENCES privacy_settings(privacy_settings_id)\n)`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customer_email (\n    email_id SERIAL PRIMARY KEY,\n    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,\n    email VARCHAR(255) NOT NULL,\n    UNIQUE (customer_id, email)\n)`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customer_phone_number (\n    phone_id SERIAL PRIMARY KEY,\n    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,\n    type VARCHAR(20) NOT NULL,\n    number VARCHAR(15) NOT NULL,\n    UNIQUE (customer_id, number)\n)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS customer_phone_number');
    await queryRunner.query('DROP TABLE IF EXISTS customer_email');
    await queryRunner.query('DROP TABLE IF EXISTS customer');
    await queryRunner.query('DROP TABLE IF EXISTS privacy_settings');
    await queryRunner.query('DROP TABLE IF EXISTS postal_address');
  }
}
