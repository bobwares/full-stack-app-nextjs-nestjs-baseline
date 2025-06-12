# Use SQLite for Codex Environment

**Status**: Proposed
**Date**: 2025-06-12
**Context**
Codex tasks run without access to a PostgreSQL instance. End-to-end tests fail when the application attempts to connect using `DATABASE_URL`.

**Decision**
When `APP_ENV` is set to `codex`, configure TypeORM to use an in-memory SQLite database instead of PostgreSQL. The `test:e2e` script sets this environment variable.

**Consequences**
E2E tests run without external dependencies and start with a clean database. Production environments still use the `DATABASE_URL` connection string.
