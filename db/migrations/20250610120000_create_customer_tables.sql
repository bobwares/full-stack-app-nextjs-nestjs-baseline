-- App: Initial Full-Stack Application
-- Package: db
-- File: 20250610120000_create_customer_tables.sql
-- Version: 2.0.29
-- Author: Bobwares
-- Date: 2025-06-10
-- Description: Create normalized customer domain tables and insert sample data.

BEGIN TRANSACTION;

-- Base customer table
CREATE TABLE IF NOT EXISTS customer (
    customer_id UUID PRIMARY KEY
);

-- Full name table
CREATE TABLE IF NOT EXISTS customer_full_name (
    customer_id UUID PRIMARY KEY REFERENCES customer(customer_id),
    first_name  VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name   VARCHAR(255) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_customer_full_name_customer_id ON customer_full_name(customer_id);

-- Email addresses
CREATE TABLE IF NOT EXISTS customer_email (
    email_id    SERIAL PRIMARY KEY,
    customer_id UUID REFERENCES customer(customer_id),
    email       VARCHAR(255) NOT NULL,
    UNIQUE(customer_id, email)
);
CREATE INDEX IF NOT EXISTS idx_customer_email_customer_id ON customer_email(customer_id);

-- Phone numbers
CREATE TABLE IF NOT EXISTS customer_phone_number (
    phone_id    SERIAL PRIMARY KEY,
    customer_id UUID REFERENCES customer(customer_id),
    type        VARCHAR(20) NOT NULL,
    number      VARCHAR(20) NOT NULL,
    UNIQUE(customer_id, type, number)
);
CREATE INDEX IF NOT EXISTS idx_customer_phone_number_customer_id ON customer_phone_number(customer_id);

-- Postal address
CREATE TABLE IF NOT EXISTS customer_postal_address (
    customer_id UUID PRIMARY KEY REFERENCES customer(customer_id),
    line1       VARCHAR(255) NOT NULL,
    line2       VARCHAR(255),
    city        VARCHAR(100) NOT NULL,
    state       VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country     CHAR(2) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_customer_postal_address_customer_id ON customer_postal_address(customer_id);

-- Privacy settings
CREATE TABLE IF NOT EXISTS customer_privacy_settings (
    customer_id              UUID PRIMARY KEY REFERENCES customer(customer_id),
    marketing_emails_enabled BOOLEAN NOT NULL,
    two_factor_enabled       BOOLEAN NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_customer_privacy_settings_customer_id ON customer_privacy_settings(customer_id);

-- Sample inserts
INSERT INTO customer (customer_id) VALUES
    ('00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0000-0000-000000000003');

INSERT INTO customer_full_name (customer_id, first_name, middle_name, last_name) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Alice', NULL, 'Smith'),
    ('00000000-0000-0000-0000-000000000002', 'Bob', 'Q', 'Jones'),
    ('00000000-0000-0000-0000-000000000003', 'Carol', NULL, 'White');

INSERT INTO customer_email (customer_id, email) VALUES
    ('00000000-0000-0000-0000-000000000001', 'alice@example.com'),
    ('00000000-0000-0000-0000-000000000002', 'bob@example.com'),
    ('00000000-0000-0000-0000-000000000003', 'carol@example.com');

INSERT INTO customer_phone_number (customer_id, type, number) VALUES
    ('00000000-0000-0000-0000-000000000001', 'mobile', '+155555501'),
    ('00000000-0000-0000-0000-000000000002', 'home', '+155555502'),
    ('00000000-0000-0000-0000-000000000003', 'work', '+155555503');

INSERT INTO customer_postal_address (customer_id, line1, line2, city, state, postal_code, country) VALUES
    ('00000000-0000-0000-0000-000000000001', '1 Main St', NULL, 'Boston', 'MA', '02101', 'US'),
    ('00000000-0000-0000-0000-000000000002', '2 Center St', 'Apt 2', 'Boston', 'MA', '02102', 'US'),
    ('00000000-0000-0000-0000-000000000003', '3 Broad St', NULL, 'Boston', 'MA', '02103', 'US');

INSERT INTO customer_privacy_settings (customer_id, marketing_emails_enabled, two_factor_enabled) VALUES
    ('00000000-0000-0000-0000-000000000001', TRUE, TRUE),
    ('00000000-0000-0000-0000-000000000002', FALSE, FALSE),
    ('00000000-0000-0000-0000-000000000003', TRUE, FALSE);

COMMIT;

-- Smoke tests
-- SELECT COUNT(*) FROM customer;
-- SELECT COUNT(*) FROM customer_email WHERE email LIKE '%@example.com';
-- SELECT customer.customer_id, first_name, email FROM customer
--   JOIN customer_full_name USING (customer_id)
--   JOIN customer_email USING (customer_id);

