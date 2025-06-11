-- App: Initial Full-Stack Application
-- Package: db
-- File: customer_tables_smoke.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Smoke tests for customer domain tables.

-- Verify customer count
SELECT COUNT(*) AS customers FROM customer;
-- Verify related email rows
SELECT COUNT(*) AS emails FROM customer_email;
-- Verify related phone rows
SELECT COUNT(*) AS phones FROM customer_phone_number;
-- Ensure no orphan emails
SELECT COUNT(*) AS orphan_emails
FROM customer_email ce
LEFT JOIN customer c ON ce.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
-- Expect 0
