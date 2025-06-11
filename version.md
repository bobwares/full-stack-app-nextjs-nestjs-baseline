# Version History

### 0.0.1 - 2025-06-10 12:00:00 UTC (task-01-json-to-sql-customer-migration)
- add customer domain migration, seed script and smoke tests
- update db README with migration instructions

### 0.0.2 - 2025-06-11T03:11:00Z (task-03-create-customer-crud-endpoints)
- implement NestJS customer CRUD module with in-memory SQLite
- add DTOs, entities, service, controller, module
- add unit and e2e tests for customers
- update README documentation
### 0.0.3 - 2025-06-11T05:37:00Z (task-03-create-customer-crud-endpoints)
- fix ESLint config and tests
- add missing sqlite3 dependency for e2e tests

### 0.0.4 - 2025-06-11T11:30:00Z (fix-swagger-link)
- enable Swagger docs at /docs
- update documentation

### 0.0.5 - 2025-06-11 (multi-env-config)
- add environment-based configuration with SQLite for codex
- provide sample env files for all environments
- update READMEs and gitignore
