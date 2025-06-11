-- App: Initial Full-Stack Application
-- Package: db
-- File: 01_customer_data.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Seed script inserting sample customers for development.

INSERT INTO customer (customer_id, first_name, middle_name, last_name, address_id, privacy_settings_id)
VALUES
    ('44444444-4444-4444-4444-444444444444', 'Dave', NULL, 'Adams', 1, 1),
    ('55555555-5555-5555-5555-555555555555', 'Eve', NULL, 'Brown', 2, 2),
    ('66666666-6666-6666-6666-666666666666', 'Frank', 'L', 'Clark', 3, 3),
    ('77777777-7777-7777-7777-777777777777', 'Grace', NULL, 'Davis', 1, 1),
    ('88888888-8888-8888-8888-888888888888', 'Hank', NULL, 'Evans', 2, 2),
    ('99999999-9999-9999-9999-999999999999', 'Ivy', NULL, 'Franklin', 3, 3),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'John', NULL, 'Gordon', 1, 1),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Karen', NULL, 'Hill', 2, 2),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Leo', NULL, 'Irwin', 3, 3),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Mia', NULL, 'Johnson', 1, 1)
ON CONFLICT DO NOTHING;

-- Smoke test
SELECT COUNT(*) AS seeded_customers FROM customer;
