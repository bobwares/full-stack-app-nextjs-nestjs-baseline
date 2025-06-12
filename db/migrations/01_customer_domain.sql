-- App: Full-Stack Application
-- Package: db
-- File: 01_customer_domain.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-12
-- Description: Creates the customer_profile schema and normalized tables.
BEGIN;
CREATE SCHEMA IF NOT EXISTS customer_profile;
SET search_path TO customer_profile, public;
/* ---------- Reference tables ---------- */
CREATE TABLE IF NOT EXISTS postal_address (
    address_id  SERIAL PRIMARY KEY,
    line1       VARCHAR(255) NOT NULL,
    line2       VARCHAR(255),
    city        VARCHAR(100) NOT NULL,
    state       VARCHAR(50)  NOT NULL,
    postal_code VARCHAR(20),
    country     CHAR(2)      NOT NULL
);
CREATE TABLE IF NOT EXISTS privacy_settings (
    privacy_settings_id      SERIAL PRIMARY KEY,
    marketing_emails_enabled BOOLEAN NOT NULL,
    two_factor_enabled       BOOLEAN NOT NULL
);
/* ---------- Root entity ---------- */
CREATE TABLE IF NOT EXISTS customer (
    customer_id         UUID PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    middle_name         VARCHAR(255),
    last_name           VARCHAR(255) NOT NULL,
    address_id          INT REFERENCES postal_address(address_id),
    privacy_settings_id INT REFERENCES privacy_settings(privacy_settings_id)
);
CREATE INDEX IF NOT EXISTS idx_customer_address_id ON customer (address_id);
CREATE INDEX IF NOT EXISTS idx_customer_privacy_settings_id ON customer (privacy_settings_id);
/* ---------- One-to-many collections ---------- */
CREATE TABLE IF NOT EXISTS customer_email (
    email_id    SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    email       VARCHAR(255) NOT NULL,
    UNIQUE (customer_id, email)
);
CREATE INDEX IF NOT EXISTS idx_customer_email_customer_id ON customer_email (customer_id);
CREATE TABLE IF NOT EXISTS customer_phone_number (
    phone_id    SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    type        VARCHAR(20) NOT NULL,
    number      VARCHAR(15) NOT NULL,
    UNIQUE (customer_id, number)
);
CREATE INDEX IF NOT EXISTS idx_customer_phone_customer_id ON customer_phone_number (customer_id);
COMMIT;
