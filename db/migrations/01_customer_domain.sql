-- App: Client Profile Module
-- Package: db
-- File: 01_customer_domain.sql
-- Version: 0.0.3
-- Author: Bobwares
-- Date: 2025-06-12T01:09:13Z
-- Description: Creates normalized tables for the customer domain and a view for simplified queries.
--
BEGIN;

CREATE TABLE IF NOT EXISTS postal_address (
    address_id SERIAL PRIMARY KEY,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20),
    country CHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS privacy_settings (
    privacy_settings_id SERIAL PRIMARY KEY,
    marketing_emails_enabled BOOLEAN NOT NULL,
    two_factor_enabled BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    address_id INT REFERENCES postal_address(address_id),
    privacy_settings_id INT NOT NULL REFERENCES privacy_settings(privacy_settings_id)
);

CREATE INDEX IF NOT EXISTS idx_customer_address_id
    ON customer USING btree (address_id);
CREATE INDEX IF NOT EXISTS idx_customer_privacy_settings_id
    ON customer USING btree (privacy_settings_id);

CREATE TABLE IF NOT EXISTS customer_email (
    email_id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    UNIQUE (customer_id, email)
);

CREATE INDEX IF NOT EXISTS idx_customer_email_customer_id
    ON customer_email USING btree (customer_id);

CREATE TABLE IF NOT EXISTS customer_phone_number (
    phone_id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    number VARCHAR(15) NOT NULL,
    UNIQUE (customer_id, number)
);

CREATE INDEX IF NOT EXISTS idx_customer_phone_customer_id
    ON customer_phone_number USING btree (customer_id);

CREATE OR REPLACE VIEW customer_profile_view AS
SELECT
    c.customer_id,
    c.first_name,
    c.middle_name,
    c.last_name,
    a.line1,
    a.line2,
    a.city,
    a.state,
    a.postal_code,
    a.country,
    ps.marketing_emails_enabled,
    ps.two_factor_enabled
FROM customer c
LEFT JOIN postal_address a ON c.address_id = a.address_id
JOIN privacy_settings ps ON c.privacy_settings_id = ps.privacy_settings_id;

COMMIT;

-- Smoke test: SELECT COUNT(*) FROM customer;
