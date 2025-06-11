-- App: Initial Full-Stack Application
-- Package: db
-- File: 01_customer_data.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Seed data for customer domain tables.

INSERT INTO postal_address (line1, line2, city, state, postal_code, country) VALUES
    ('789 Oak St', NULL, 'Central City', 'IL', '60007', 'US')
ON CONFLICT DO NOTHING;

INSERT INTO privacy_settings (marketing_emails_enabled, two_factor_enabled) VALUES
    (TRUE, FALSE)
ON CONFLICT DO NOTHING;

INSERT INTO customer (customer_id, first_name, middle_name, last_name, address_id, privacy_settings_id) VALUES
    ('33333333-3333-3333-3333-333333333333', 'Alice', NULL, 'Smith', 3, 3)
ON CONFLICT DO NOTHING;

INSERT INTO customer_email (customer_id, email) VALUES
    ('33333333-3333-3333-3333-333333333333', 'alice.smith@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO customer_phone_number (customer_id, type, number) VALUES
    ('33333333-3333-3333-3333-333333333333', 'mobile', '+11234567890')
ON CONFLICT DO NOTHING;

-- Smoke Test
-- SELECT COUNT(*) FROM customer WHERE customer_id='33333333-3333-3333-3333-333333333333';
