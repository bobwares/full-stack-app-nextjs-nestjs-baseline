-- App: Initial Full-Stack Application
-- Package: db
-- File: 20250610120000_create_customer_tables.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Creates normalized tables for the customer domain.

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
    privacy_settings_id INT REFERENCES privacy_settings(privacy_settings_id)
);

CREATE INDEX IF NOT EXISTS idx_customer_address_id ON customer (address_id);
CREATE INDEX IF NOT EXISTS idx_customer_privacy_settings_id ON customer (privacy_settings_id);

CREATE TABLE IF NOT EXISTS customer_email (
    email_id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    UNIQUE (customer_id, email)
);

CREATE INDEX IF NOT EXISTS idx_customer_email_customer_id ON customer_email (customer_id);

CREATE TABLE IF NOT EXISTS customer_phone_number (
    phone_id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    number VARCHAR(15) NOT NULL,
    UNIQUE (customer_id, number)
);

CREATE INDEX IF NOT EXISTS idx_customer_phone_customer_id ON customer_phone_number (customer_id);

-- Sample Data
INSERT INTO postal_address (line1, line2, city, state, postal_code, country) VALUES
    ('123 Main St', 'Apt 4B', 'Metropolis', 'NY', '10001', 'US'),
    ('456 Maple Ave', NULL, 'Gotham', 'NJ', '07001', 'US')
ON CONFLICT DO NOTHING;

INSERT INTO privacy_settings (marketing_emails_enabled, two_factor_enabled) VALUES
    (TRUE, TRUE),
    (FALSE, FALSE)
ON CONFLICT DO NOTHING;

INSERT INTO customer (customer_id, first_name, middle_name, last_name, address_id, privacy_settings_id) VALUES
    ('11111111-1111-1111-1111-111111111111', 'John', NULL, 'Doe', 1, 1),
    ('22222222-2222-2222-2222-222222222222', 'Jane', 'Q', 'Public', 2, 2)
ON CONFLICT DO NOTHING;

INSERT INTO customer_email (customer_id, email) VALUES
    ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com'),
    ('22222222-2222-2222-2222-222222222222', 'jane.public@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO customer_phone_number (customer_id, type, number) VALUES
    ('11111111-1111-1111-1111-111111111111', 'mobile', '+1234567890'),
    ('22222222-2222-2222-2222-222222222222', 'home', '+1987654321')
ON CONFLICT DO NOTHING;

-- Smoke Tests
-- Expect 2 customers
SELECT COUNT(*) AS customer_count FROM customer;
-- Expect 2 emails
SELECT COUNT(*) AS email_count FROM customer_email;
-- Expect 2 phone numbers
SELECT COUNT(*) AS phone_count FROM customer_phone_number;

COMMIT;
