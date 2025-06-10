# Story 07 – Generate Normalized Customer Tables from JSON Schema

**Description**
Leverage the task definition in `project_root/db/tasks/TASK - DB - JSON to SQL Transformation.md` to transform the **Customer Domain** JSON schema into a fully normalized PostgreSQL 16 schema. The deliverable is a timestamped migration that:

* Resides at `db/migrations/20250610120000_create_customer_tables.sql`.
* Starts with a full metadata header (title, author, date, description, tech stack).
* Produces tables in 3ⁿᵈ Normal Form with singular names (e.g., `customer`, `customer_address`, `customer_contact`).
* Infers column data types, primary and foreign keys, unique constraints, and indexes.
* Decomposes nested objects into separate tables linked by foreign keys.
* Converts any array properties into child tables with many-to-one relationships.
* Includes representative `INSERT` statements for smoke-testing.
* Ends with self-contained smoke tests that assert row counts and key integrity.

**Acceptance Criteria**

* `project_root/db/migrations/20250610120000_create_customer_tables.sql`:
    * Contains a metadata header block.
    * Uses `CREATE TABLE IF NOT EXISTS` statements valid for PostgreSQL 16.
    * Implements all keys, constraints, and indexes required by the JSON schema.
    * Provides at least three sample `INSERT` statements per table.
    * Concludes with smoke-test SQL (e.g., `SELECT COUNT(*)`, simple join checks).
* `project_root/db/scripts/seed/NN_customer_data.sql`:
    * Contains a metadata header block.  
    * contains insert statements for creating 10 test records.
* The migration runs cleanly with `psql -f` inside the project’s Docker container (`docker-compose up db`).
* Naming conventions, timestamp format, and directory layout match project standards.
* `project_root/db/README.md` gains a short “Customer Domain Migration” section describing how to execute the migration and smoke tests locally.

**Inputs**

* `project_root/db/tasks/TASK - DB - JSON to SQL Transformation.md` (task definition to follow)
* `project_root/schemas/customer_domain.json` (Customer aggregate schema)
* Environment variables: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `DATABASE_URL`

**Expected Outputs**

* `project_root/db/migrations/20250610120000_create_customer_tables.sql`
* `project_root/db/scripts/seed/NN_customer_data.sql`
* `project_root/db/test/customer_tables_smoke.sql` if smoke tests are broken out
* Update to `project_root/db/README.md` under the “Migrations” section

**Workflow Outline**

1. **Review the DB task file** to confirm conventions, timestamp rules, and required header fields.
2. **Parse the customer JSON schema** to derive an entity-relationship outline (e.g., `customer`, `customer_address`, `customer_contact`, etc.).
3. **Draft SQL** with all constraints and indexes (`btree` on foreign keys, `GIN` or `btree` on heavily-queried columns).
4. **Add representative data** matching the schema for smoke testing.
5. **Append smoke-test queries** ensuring row counts and referential integrity.
6. **Validate locally** in Docker, commit, and open a pull request on branch `task-07-json-to-sql-customer-migration`.

When merged, the normalized Customer schema will be available for downstream services and API development.
