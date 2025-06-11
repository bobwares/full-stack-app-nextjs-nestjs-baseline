BEGIN;

-- Truncate tables in reverse dependency order
TRUNCATE TABLE customer_phone_number RESTART IDENTITY CASCADE;
TRUNCATE TABLE customer_email RESTART IDENTITY CASCADE;
TRUNCATE TABLE customer RESTART IDENTITY CASCADE;
TRUNCATE TABLE privacy_settings RESTART IDENTITY CASCADE;
TRUNCATE TABLE postal_address RESTART IDENTITY CASCADE;

-- Insert 10 postal addresses
INSERT INTO postal_address (line1, line2, city, state, postal_code, country) VALUES
                                                                                 ('123 Main St', 'Apt 1', 'Metropolis', 'NY', '10001', 'US'),
                                                                                 ('456 Maple Ave', NULL, 'Gotham', 'NJ', '07001', 'US'),
                                                                                 ('789 Elm St', 'Suite 2', 'Star City', 'CA', '90001', 'US'),
                                                                                 ('321 Oak Blvd', NULL, 'Central City', 'IL', '60007', 'US'),
                                                                                 ('654 Pine Rd', NULL, 'Coast City', 'OR', '97035', 'US'),
                                                                                 ('987 Spruce Dr', 'Unit 3', 'Smallville', 'KS', '66002', 'US'),
                                                                                 ('246 Cedar Ln', NULL, 'Blüdhaven', 'PA', '19019', 'US'),
                                                                                 ('135 Birch Pl', NULL, 'Fawcett City', 'TX', '75001', 'US'),
                                                                                 ('864 Aspen Ct', 'Floor 4', 'Ivy Town', 'MA', '02138', 'US'),
                                                                                 ('579 Willow Way', NULL, 'Gateway City', 'AZ', '85001', 'US');

-- Insert 10 privacy settings
INSERT INTO privacy_settings (marketing_emails_enabled, two_factor_enabled) VALUES
                                                                                (TRUE, TRUE),
                                                                                (FALSE, FALSE),
                                                                                (TRUE, FALSE),
                                                                                (FALSE, TRUE),
                                                                                (TRUE, TRUE),
                                                                                (FALSE, FALSE),
                                                                                (TRUE, FALSE),
                                                                                (FALSE, TRUE),
                                                                                (TRUE, TRUE),
                                                                                (FALSE, FALSE);

-- Insert 10 customers
INSERT INTO customer (customer_id, first_name, middle_name, last_name, address_id, privacy_settings_id) VALUES
                                                                                                            ('11111111-1111-1111-1111-111111111111', 'John', NULL, 'Doe', 1, 1),
                                                                                                            ('22222222-2222-2222-2222-222222222222', 'Jane', 'Q', 'Public', 2, 2),
                                                                                                            ('33333333-3333-3333-3333-333333333333', 'Oliver', NULL, 'Queen', 3, 3),
                                                                                                            ('44444444-4444-4444-4444-444444444444', 'Barry', 'A', 'Allen', 4, 4),
                                                                                                            ('55555555-5555-5555-5555-555555555555', 'Hal', NULL, 'Jordan', 5, 5),
                                                                                                            ('66666666-6666-6666-6666-666666666666', 'Clark', 'J', 'Kent', 6, 6),
                                                                                                            ('77777777-7777-7777-7777-777777777777', 'Bruce', NULL, 'Wayne', 7, 7),
                                                                                                            ('88888888-8888-8888-8888-888888888888', 'Diana', 'P', 'Prince', 8, 8),
                                                                                                            ('99999999-9999-9999-9999-999999999999', 'Arthur', NULL, 'Curry', 9, 9),
                                                                                                            ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Victor', 'S', 'Stone', 10, 10);

-- Insert 10 customer emails
INSERT INTO customer_email (customer_id, email) VALUES
                                                    ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com'),
                                                    ('22222222-2222-2222-2222-222222222222', 'jane.public@example.com'),
                                                    ('33333333-3333-3333-3333-333333333333', 'oliver.queen@starcity.com'),
                                                    ('44444444-4444-4444-4444-444444444444', 'barry.allen@ccpd.com'),
                                                    ('55555555-5555-5555-5555-555555555555', 'hal.jordan@coastcity.com'),
                                                    ('66666666-6666-6666-6666-666666666666', 'clark.kent@dailyplanet.com'),
                                                    ('77777777-7777-7777-7777-777777777777', 'bruce.wayne@wayneenterprises.com'),
                                                    ('88888888-8888-8888-8888-888888888888', 'diana.prince@themiscira.com'),
                                                    ('99999999-9999-9999-9999-999999999999', 'arthur.curry@atlantis.com'),
                                                    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'victor.stone@starlabs.com');

-- Insert 10 customer phone numbers
INSERT INTO customer_phone_number (customer_id, type, number) VALUES
                                                                  ('11111111-1111-1111-1111-111111111111', 'mobile', '+1234567890'),
                                                                  ('22222222-2222-2222-2222-222222222222', 'home', '+1987654321'),
                                                                  ('33333333-3333-3333-3333-333333333333', 'work', '+1122334455'),
                                                                  ('44444444-4444-4444-4444-444444444444', 'mobile', '+1098765432'),
                                                                  ('55555555-5555-5555-5555-555555555555', 'work', '+1456789123'),
                                                                  ('66666666-6666-6666-6666-666666666666', 'mobile', '+1678901234'),
                                                                  ('77777777-7777-7777-7777-777777777777', 'home', '+1789012345'),
                                                                  ('88888888-8888-8888-8888-888888888888', 'mobile', '+1890123456'),
                                                                  ('99999999-9999-9999-9999-999999999999', 'work', '+1901234567'),
                                                                  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'mobile', '+1012345678');

-- Smoke Tests
SELECT COUNT(*) AS customer_count FROM customer;         -- Expect 10
SELECT COUNT(*) AS email_count FROM customer_email;       -- Expect 10
SELECT COUNT(*) AS phone_count FROM customer_phone_number;-- Expect 10

COMMIT;
