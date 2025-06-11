-- App: Initial Full-Stack Application
-- Package: db
-- File: 20250610121000_seed_20_customers.sql
-- Version: 0.1.0
-- Author: AI Agent
-- Date: 2025-06-10
-- Description: Resets customer-domain tables and seeds 20 test customers.

------------------------------------------------------------
-- 0. Ensure UUID generator (pick ONE of the two lines)
------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;          -- gen_random_uuid()
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";    -- uuid_generate_v4()

------------------------------------------------------------
-- 1. Wipe old rows & reset identity sequences
------------------------------------------------------------
TRUNCATE TABLE
    customer_phone_number,
    customer_email,
    customer,
    privacy_settings,
    postal_address
    RESTART IDENTITY CASCADE;

------------------------------------------------------------
-- 2. Build fixture data via CTEs (no temp tables, no INTO)
------------------------------------------------------------
WITH addr_raw AS (
    INSERT INTO postal_address
        (line1, line2, city, state, postal_code, country)
        VALUES
            ('101 Maple Ave',   NULL,        'Springfield',  'IL', '62704', 'US'),
            ('202 Birch Rd',    'Apt 2B',    'Madison',      'WI', '53703', 'US'),
            ('303 Cedar Ln',    NULL,        'Austin',       'TX', '78701', 'US'),
            ('404 Pine St',     'Unit 5',    'Denver',       'CO', '80202', 'US'),
            ('505 Elm Dr',      NULL,        'Seattle',      'WA', '98101', 'US'),
            ('606 Ash Ct',      'Suite 300', 'Portland',     'OR', '97205', 'US'),
            ('707 Cherry Blvd', NULL,        'Phoenix',      'AZ', '85004', 'US'),
            ('808 Walnut Pl',   NULL,        'Atlanta',      'GA', '30303', 'US'),
            ('909 Poplar Way',  'Fl 4',      'Boston',       'MA', '02108', 'US'),
            ('111 Sycamore St', NULL,        'Nashville',    'TN', '37201', 'US'),
            ('222 Hickory Rd',  NULL,        'Chicago',      'IL', '60604', 'US'),
            ('333 Locust Ave',  NULL,        'Columbus',     'OH', '43215', 'US'),
            ('444 Willow Ln',   NULL,        'Charlotte',    'NC', '28202', 'US'),
            ('555 Fir St',      'Apt 9A',    'Miami',        'FL', '33130', 'US'),
            ('666 Cypress Dr',  NULL,        'Kansas City',  'MO', '64106', 'US'),
            ('777 Magnolia Ct', NULL,        'Dallas',       'TX', '75201', 'US'),
            ('888 Dogwood Pl',  NULL,        'Minneapolis',  'MN', '55401', 'US'),
            ('999 Redbud Way',  'Unit 12',   'Houston',      'TX', '77002', 'US'),
            ('121 Juniper Blvd',NULL,        'San Francisco','CA', '94105', 'US'),
            ('131 Hemlock Ave', NULL,        'Los Angeles',  'CA', '90012', 'US')
        RETURNING address_id
), addr AS (
    SELECT address_id,
           ROW_NUMBER() OVER (ORDER BY address_id) AS rn
    FROM   addr_raw
),
     priv_raw AS (
         INSERT INTO privacy_settings (marketing_emails_enabled, two_factor_enabled)
             SELECT *
             FROM (VALUES
                       (TRUE,  TRUE ), (TRUE,  FALSE), (FALSE, TRUE ), (FALSE, FALSE),
                       (TRUE,  TRUE ), (FALSE, TRUE ), (TRUE,  FALSE), (FALSE, FALSE),
                       (TRUE,  TRUE ), (FALSE, TRUE ), (TRUE,  FALSE), (FALSE, FALSE),
                       (TRUE,  TRUE ), (FALSE, TRUE ), (TRUE,  FALSE), (FALSE, FALSE),
                       (TRUE,  TRUE ), (FALSE, TRUE ), (TRUE,  FALSE), (FALSE, FALSE)
                  ) AS v(marketing_emails_enabled, two_factor_enabled)
             RETURNING privacy_settings_id
     ), priv AS (
    SELECT privacy_settings_id,
           ROW_NUMBER() OVER (ORDER BY privacy_settings_id) AS rn
    FROM   priv_raw
),
     names AS (
         SELECT *
         FROM (VALUES
                   (1 , 'John',      NULL, 'Doe'),
                   (2 , 'Maria',     'L.', 'Garcia'),
                   (3 , 'David',     NULL, 'Johnson'),
                   (4 , 'Emily',     'A.', 'Davis'),
                   (5 , 'Michael',   NULL, 'Brown'),
                   (6 , 'Jessica',   NULL, 'Miller'),
                   (7 , 'Daniel',    'K.', 'Wilson'),
                   (8 , 'Olivia',    NULL, 'Martinez'),
                   (9 , 'James',     NULL, 'Anderson'),
                   (10, 'Sophia',    'M.', 'Thomas'),
                   (11, 'Benjamin',  NULL, 'Taylor'),
                   (12, 'Ava',       NULL, 'Moore'),
                   (13, 'William',   NULL, 'Jackson'),
                   (14, 'Mia',       'R.', 'White'),
                   (15, 'Alexander', NULL, 'Harris'),
                   (16, 'Charlotte', NULL, 'Martin'),
                   (17, 'Ethan',     NULL, 'Thompson'),
                   (18, 'Isabella',  NULL, 'Garcia'),
                   (19, 'Lucas',     'J.', 'Clark'),
                   (20, 'Harper',    NULL, 'Lewis')
              ) AS t(rn, first_name, middle_name, last_name)
     ),
     src AS (  -- composite view used for all inserts
         SELECT
                     ROW_NUMBER() OVER ()                              AS seq,
                     COALESCE(gen_random_uuid(), uuid_generate_v4())   AS customer_id,
                     n.first_name, n.middle_name, n.last_name,
                     a.address_id,
                     p.privacy_settings_id
         FROM names n
                  JOIN addr a  USING (rn)
                  JOIN priv p  USING (rn)
     ),
     ins AS (   -- insert customers, expose ids for follow-up inserts
         INSERT INTO customer (
                               customer_id, first_name, middle_name, last_name,
                               address_id,  privacy_settings_id
             )
             SELECT
                 customer_id, first_name, middle_name, last_name,
                 address_id,  privacy_settings_id
             FROM src
             RETURNING customer_id, seq, first_name, last_name
     )

------------------------------------------------------------
-- 3. Customer e-mails (1 each)
------------------------------------------------------------
INSERT INTO customer_email (customer_id, email)
SELECT
    customer_id,
    LOWER(first_name || '.' || last_name || '@example.com')
FROM ins;

------------------------------------------------------------
-- 4. Customer phone numbers (1 each)
------------------------------------------------------------
INSERT INTO customer_phone_number (customer_id, type, number)
SELECT
    customer_id,
    'mobile',
    '+1312555' || LPAD(seq::text, 4, '0')
FROM ins;

------------------------------------------------------------
-- 5. Smoke test — must return 20 | 20 | 20
------------------------------------------------------------
SELECT
    (SELECT COUNT(*) FROM customer)             AS customers,
    (SELECT COUNT(*) FROM customer_email)       AS emails,
    (SELECT COUNT(*) FROM customer_phone_number) AS phones;
