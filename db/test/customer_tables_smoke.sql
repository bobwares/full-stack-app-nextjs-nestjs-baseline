-- App: Initial Full-Stack Application
-- Package: db
-- File: customer_tables_smoke.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Smoke tests for customer tables.

SELECT COUNT(*) FROM customer;
SELECT COUNT(*) FROM customer_email;
SELECT COUNT(*) FROM customer_phone_number;
SELECT c.customer_id, e.email
FROM customer c
JOIN customer_email e ON c.customer_id = e.customer_id
LIMIT 1;
