# Backend AI Coding Agent (Codex) Context

## 1. Purpose

Provide Codex with all information needed to generate, modify, and validate back-end application code reliably and consistently. This document defines the project context, conventions, constraints, and prompt templates for the AI Coding Agent.

## 2. Application Overview

This is a NestJS + TypeScript REST API that connects to an ORM layer. Its responsibilities include:

* Defining controllers, services, and modules under `src/`
* Exposing CRUD endpoints over HTTP
* Interacting with the database via an ORM (e.g. TypeORM, Prisma)
* Validating input, handling errors, and returning structured responses

## 3. Technology Stack

**Runtime**

* Node.js (v20 or later)

**Language**

* TypeScript (v5.x or later)

**Framework**

* NestJS (latest stable)

**ORM**

* TypeORM or Prisma (refer to `package.json` for the chosen library)

**Testing**

* Jest

Refer to `project_root/api/package.json` for exact dependency versions.

## 4. Coding Style & Conventions

1. **Directory Layout**

    * All production code resides under `src/`.
    * Tests mirror the source structure under `src/` (unit tests) or in `__tests__/` (integration/e2e).

2. **Metadata Headers**
   Each source file must begin with a metadata header specifying application, package, file, version, author, date, and description.

   *Definition of metadata header section:*

   ```markdown
   # App: {{Application Name}}
   # Package: {{package}}
   # File: {{file name}}
   # Version: 2.0.29
   # Author: {{author}}
   # Date: {{current date/ time}}
   # Description: document the function of the code.
   #
   ```

3. **Test-Driven Development (TDD)**

    * Write tests before implementing new functionality.
    * Maintain a minimum of 80% code coverage.
    * Name test files `<module>.spec.ts` or `<module>.test.ts`.

4. **Use of Modern Language & Framework Features**

    * Use async/await, decorators, dependency injection, and pipe-based validation.
    * Leverage NestJS features: modules, controllers, providers, guards, interceptors, and filters.
    * Avoid deprecated APIs or experimental flags.
    * Update dependencies regularly for security and feature improvements.

5. **Documentation**

    * Maintain `project_root/api/README.md` with:

        * Overview and architecture
        * Setup and build instructions
        * API endpoint summary (e.g. Swagger/OpenAPI)
        * Instructions for running migrations and seeding data

## 5. Architectural Constraints

1. **Multi-Environment Support**

    * Environments: `local`, `development`, `staging`, `production`
    * Active environment specified via `APP_ENV` or `NODE_ENV`.

2. **Externalized & Validated Configuration**

    * All settings (database URLs, credentials, feature flags) from environment variables.
    * Validate on startup using a schema (e.g. Joi, Zod). Fail fast on missing/invalid values.

3. **Secret Management**

    * Retrieve sensitive values (DB passwords, JWT secrets) from a secure vault or secrets manager at runtime.
    * Never commit secrets to source control.

4. **Logging & Monitoring**

    * Configurable log levels via env var (`DEBUG`, `INFO`, `WARN`, `ERROR`).
    * Emit structured JSON logs.
    * Integrate with monitoring systems (e.g. Prometheus metrics, application performance tracing).

5. **Health Checks & Readiness**

    * Expose `/health` and `/ready` endpoints for liveness/readiness probes.
    * Health checks should verify DB connectivity and dependent services.

6. **API Documentation**

    * Generate OpenAPI (Swagger) docs via NestJS decorators.
    * Expose `/docs` or `/api-docs` endpoint in non-production environments.

7. **Error Handling & Validation**

    * Use global exception filters to format errors uniformly.
    * Validate request payloads with DTOs, Pipes, and class-validator.
    * Return clear, structured error responses with appropriate HTTP status codes.

8. **Twelve-Factor Compliance**

    * Strict separation of config from code.
    * Build once, deploy the same artifact across all environments.

9. **CI/CD & Migrations**

    * CI pipelines must run linting, tests, and build before merging.
    * Database migrations managed via CLI; run at deployment time.

10. **Secure Defaults**

    * Default to least-privilege database accounts.
    * Enforce HTTPS and CORS policies.
    * Sanitize all inputs to prevent injection attacks.

## 6. Agent Prompt Template

When crafting prompts for Codex, follow this structure:

### Context

```
<Brief summary of module or feature>
Tech: NestJS, TypeScript, [ORM]
Env: { APP_ENV = "<env>" }
DB: <database type and connection method>
```

### Task

```
<Clear instruction — e.g. “Create an endpoint GET /users that returns a paginated list of users…”>
```

### Constraints

```
- Place code under `src/users/`
- Prepend metadata header as specified
- Use DTO classes with validation decorators
- Write unit tests in `users.service.spec.ts` and `users.controller.spec.ts`
```

### Output Format

```
- Provide complete file content blocks (controllers, services, DTOs, tests)
- No explanatory text outside code fences
```

## 7. Sample Prompt

```
### Context
User management module to handle registration and retrieval.
Tech: NestJS, TypeScript, TypeORM
Env: { APP_ENV = "development" }
DB: PostgreSQL via TypeORM

### Task
Implement `users.controller.ts` and `users.service.ts` under `src/users/`:
- Controller: 
  - POST /users to create a user using `CreateUserDto`
  - GET /users to return paginated list
- Service:
  - `create()` and `findAll(page: number, limit: number)`
- Use TypeORM repository injection

### Constraints
- Prepend required metadata header
- DTO classes in `src/users/dto/`
- Validate input with class-validator
- Write tests in `users.service.spec.ts` and `users.controller.spec.ts`

### Output Format
- Three code fences: controller, service, DTOs plus two fences for tests
```

Keeping prompts precise and consistent ensures Codex reliably generates back-end code that adheres to project standards, conventions, and architectural requirements.

End of Document
