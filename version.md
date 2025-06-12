# Version History

### 0.0.3 – 2025-06-12T01:09:52Z (feat/normalized-customer-tables-T01)

#### Task
Ticket 01 – Generate Normalized Customer Tables from JSON Schema

#### Changes
- Add customer domain migration
- Document migration usage

### 0.0.4 – 2025-06-12T01:30:00Z (feat/test-data-T02)

#### Task
Ticket 02 – Create set of test data

#### Changes
- Add test data seed script
- Document how to load sample data

### 0.0.5 – 2025-06-12T02:53:21Z (feat/customer-crud-T03)

#### Task
Ticket 03 – Implement Customer Domain CRUD Endpoints

#### Changes
- Scaffold NestJS API with Customers module
- Implement in-memory CRUD service and controller
- Add DTO validation and unit tests

### 0.0.6 – 2025-06-12T06:19:08Z (feat/customer-persistence-T04)

#### Task
Ticket 04 – Persist Customer Data to PostgreSQL

#### Changes
- Adopt TypeORM for database access with new entities
- Implement repository-backed service and controller
- Add TypeORM migration and e2e tests
- Document ORM decision in ADR

### 0.0.7 – 2025-06-12T06:46:08Z (feat/validation-errors-T05)

#### Task
Task 05 – Global Validation Pipe & Error Handling

#### Changes
- Add HttpExceptionFilter for consistent error responses
- Register global ValidationPipe with custom 400/422 handling
- Document error envelope in new ADR and README

### 0.0.8 – 2025-06-12T06:58:30Z (fix/eslint-config)

#### Task
Fix ESLint configuration so `npm run lint` executes with flat configs

#### Changes
- Reworked `eslint.config.js` to use flat config without `extends`
- Simplified rules and ignored test files

### 0.0.9 – 2025-06-12T07:09:36Z (test/sqlite-codex)

#### Task
Use SQLite for Codex environment and fix e2e tests.

#### Changes
- Modified AppModule to select SQLite when `APP_ENV=codex`
- Updated `test:e2e` script to set `APP_ENV=codex`
- Added ADR describing Codex SQLite configuration

### 0.0.10 – 2025-06-12T07:22:00Z (feat/api-logging)

#### Task
Task 06 – API Logging & Structured Request Tracing

#### Changes
- Added LoggingModule with nestjs-pino
- Introduced request ID middleware and logging interceptor
- Added health endpoint and global logging setup
- Documented logging configuration in README

### 0.0.11 – 2025-06-12T07:40:00Z (feat/swagger-docs)

#### Task
Task 07 – Swagger / OpenAPI Documentation Endpoint

#### Changes
- Configured Swagger with basic auth and OpenAPI export
- Added Swagger decorators to Customers controller
- Created export script and docs/openapi.json
- Documented API docs usage in README

### 0.0.12 – 2025-06-12T07:49:47Z (test/coverage-80)

#### Task
Task 08 – Unit-Test Coverage ≥ 80 % (Service & Controller)

#### Changes
- Added coverageThreshold to Jest config and excluded boilerplate files
- Implemented ValidationPipe, error filter, and service edge-case tests
- Enhanced controller tests for all CRUD operations
- Updated service to check duplicate emails and soft-delete removal

### 0.0.13 – 2025-06-12T07:57:21Z (test/e2e-supertest)

#### Task
Task 09 – End-to-End Tests with Supertest

#### Changes
- Expanded e2e suite to cover create, update, delete and error paths
- Documented how `npm run test:e2e` uses SQLite when `APP_ENV=codex`
