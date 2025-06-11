-- App: Initial Full-Stack Application
-- Package: db
-- File: 20250610120000_create_customer_tables.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Creates normalized tables for the customer domain and inserts sample data.

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

-- Sample data inserts for smoke testing
INSERT INTO postal_address (line1, line2, city, state, postal_code, country) VALUES
    ('123 Main St', NULL, 'Austin', 'TX', '78701', 'US'),
    ('456 Market St', 'Suite 10', 'San Francisco', 'CA', '94105', 'US'),
    ('789 Maple Ave', NULL, 'Seattle', 'WA', '98101', 'US');

INSERT INTO privacy_settings (marketing_emails_enabled, two_factor_enabled) VALUES
    (TRUE, TRUE),
    (FALSE, TRUE),
    (TRUE, FALSE);

INSERT INTO customer (customer_id, first_name, middle_name, last_name, address_id, privacy_settings_id) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Alice', NULL, 'Smith', 1, 1),
    ('22222222-2222-2222-2222-222222222222', 'Bob', 'J', 'Jones', 2, 2),
    ('33333333-3333-3333-3333-333333333333', 'Carol', NULL, 'Taylor', 3, 3);

INSERT INTO customer_email (customer_id, email) VALUES
    ('11111111-1111-1111-1111-111111111111', 'alice@example.com'),
    ('22222222-2222-2222-2222-222222222222', 'bob@example.com'),
    ('33333333-3333-3333-3333-333333333333', 'carol@example.com');

INSERT INTO customer_phone_number (customer_id, type, number) VALUES
    ('11111111-1111-1111-1111-111111111111', 'mobile', '+15555550101'),
    ('22222222-2222-2222-2222-222222222222', 'home', '+15555550102'),
    ('33333333-3333-3333-3333-333333333333', 'work', '+15555550103');

-- Smoke tests
SELECT COUNT(*) AS customer_count FROM customer;
SELECT COUNT(*) AS email_count FROM customer_email;
SELECT COUNT(*) AS phone_count FROM customer_phone_number;
SELECT c.customer_id, e.email FROM customer c JOIN customer_email e ON c.customer_id = e.customer_id LIMIT 1;

COMMIT;
