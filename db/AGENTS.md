# Database AI Coding Agent Context

## 1. Purpose

Provide the AI Coding Agent with all information needed to generate, modify, and validate the database directory code reliably and consistently. This document defines the context, conventions, constraints, and prompt templates for tasks in `/db`.

## 2. Application Overview

This directory defines the project’s persistence layer. It contains:

* `Dockerfile` – defines the PostgreSQL container.
* `docker-compose.yml` – service definition for local development.
* `.env.example` – sample environment variables.
* `migrations/` – timestamped forward-only SQL migration scripts.
* `scripts/schema/` – ordered DDL scripts.
* `scripts/seed/` – idempotent data seeding scripts.

## 3. Technology Stack

**Container**

* Docker (v24+) & Docker Compose (v2.x)

**Database**

* PostgreSQL (v16)

**Migrations**

* Plain SQL files

**Scripting**

* Bash (for exec scripts)

Refer to `project_root/db` for file structure and versions.

## 4. Coding Style & Conventions

1. **Directory Layout**

    * All files reside under `db/`.
    * `migrations/` for forward-only migrations.
    * `scripts/schema/` for base schema DDL.
    * `scripts/seed/` for reference and sample data.

2. **Metadata Headers**
   Each SQL and script file must begin with:

   ```sql
   -- App: {{Application Name}}
   -- Package: db
   -- File: {{file name}}
   -- Version: 2.0.29
   -- Author: {{author}}
   -- Date: {{current date/time}}
   -- Description: document the function of the code.
   ```

3. **Naming Conventions**

    * **Migrations**: `YYYYMMDDHHMMSS_<slug>.sql`
    * **Schema Scripts**: `01_<description>.sql`, `02_<description>.sql`, …
    * **Seed Scripts**: `01_<description>.sql`, …

4. **Idempotency**

    * Seed scripts must be safe to re-run without duplicating data.
    * DDL must use `IF NOT EXISTS`.

5. **Testing**

    * Provide simple SQL queries for smoke tests in comments.
    * Validate migrations in CI via `make db-test`.

## 5. Architectural Constraints

1. **Environment Parity**

    * Local, CI, and production must use the same PostgreSQL version.

2. **Forward-Only Migrations**

    * Do not modify existing migration files; add new ones only.

3. **Secrets Management**

    * Credentials supplied via `.env`; never commit real secrets.

4. **CI Integration**

    * Migrations and seeds must run non-interactively.
    * Provide a script (e.g. `scripts/exec-all.sh`) for CI.

5. **Isolation**

    * Database container must expose port `5432` only to localhost.

## 6. Agent Prompt Template

Use this structure when creating prompts:

### Context

```
<Brief summary of DB task>
Tech: PostgreSQL 16, Docker, Plain SQL
Env: { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB }
```

### Task

```
<Clear instruction, e.g.>
Generate a new migration to add column `archived` BOOLEAN DEFAULT FALSE
to table `customer_preference`.
```

### Constraints

```
- Create a file under db/migrations/ with the correct timestamped name.
- Prepend the SQL metadata header.
- Use `IF NOT EXISTS` clauses.
- Do not modify existing migrations.
```

### Output Format

```
- Provide only the contents of the new SQL file in a single code fence.
```

## 7. Sample Prompt

```
### Context
Add archiving support to customer_preference table.
Tech: PostgreSQL 16, Docker, Plain SQL
Env: { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB }

### Task
Create a migration in `db/migrations/` named `20250610103000_add_archived_to_customer_preference.sql` that:
- Adds a BOOLEAN column `archived` DEFAULT FALSE.
- Backfills existing rows to FALSE.
- Uses the SQL metadata header.

### Constraints
- Forward-only migration.
- Use `IF NOT EXISTS` clauses.

### Output Format
- Single SQL file content in a code fence.
```
End of Document