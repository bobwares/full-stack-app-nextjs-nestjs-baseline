# TASK - DB - Seed Script

**Context**:
Seed initial customer data for development.
Tech: PostgreSQL 16 Dialect
Directory: /db

**Task**:
Create a seed script in `project_root/db/test/01_<domain>_test_dataed.sql` that:
- Inserts 10 sample records for the normalized table.
- Ensures idempotency using `ON CONFLICT DO NOTHING`
- Includes a metadata header and smoke test query

**Constraints**:
- Use `INSERT ... ON CONFLICT`
- Follow SQL style conventions
- Include realistic sample data
- Include timestamps in UTC

**Inputs**

Domain = customer_profile
SQL DLL =  `project_root/db/migrations/01_customer_domain.sql`


**Output**:
- File: `project_root/db/test/01_customer_domain_test_data.sql`
- A complete SQL file with metadata header, `INSERT` statements, and smoke test.