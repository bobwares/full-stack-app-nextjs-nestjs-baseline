# Backend Application README

## Overview

This is the back-end REST API for our application, built with NestJS and TypeScript. It connects to a database via an ORM and exposes CRUD endpoints for client consumption.

## Technology Stack

* **Runtime:** Node.js (v20 or later)
* **Language:** TypeScript (v5.x or later)
* **Framework:** NestJS (latest stable)
* **ORM:** TypeORM or Prisma (see `package.json`)
* **Testing:** Jest

Refer to `package.json` in `project_root/api/` for exact dependency versions.

## Prerequisites

* Node.js v20 or higher
* A running database instance (e.g. PostgreSQL, MySQL)
* Environment variables configured in a `.env` file

## Environment Variables

Create a `.env` file in the `project_root/api/` directory with entries such as:

```env
APP_ENV=development
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

Adjust values for your local, staging, or production environments.

## Installation

```bash
cd project_root/api
npm install
```

## Development

Start the NestJS development server with hot reload:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`.

## Build & Production

Compile TypeScript to JavaScript and run the server:

```bash
npm run build
npm run start:prod
```

## Testing

Run unit and integration tests:

```bash
npm run test
npm run test:coverage
npm run test:e2e
```

Test files follow the naming conventions `<module>.spec.ts` or `<module>.test.ts` and mirror the `src/` structure.

## Database Migrations

If using TypeORM:

```bash
npm run typeorm migration:run
```

If using Prisma:

```bash
npm run prisma migrate deploy
```

Adjust commands based on your chosen ORM.

## Directory Structure

```
project_root/api/
├── src/
│   ├── modules/           Feature modules (controllers, services, entities)
│   ├── common/            Shared utilities, filters, pipes, interceptors
│   ├── config/            Configuration loader and validation schemas
│   ├── main.ts            Application entry point
│   └── ...                Other application code
├── test/                  End-to-end tests
├── migrations/            Database migration files
├── package.json
├── tsconfig.json
├── ormconfig.json         (if using TypeORM)
├── prisma/                (if using Prisma)
└── README.md
```

## Coding Conventions

* All source code resides under `src/`.
* Each file begins with a metadata header (App, Package, File, Version, Author, Date, Description).
* Follow Test-Driven Development: write tests before implementation and maintain ≥ 80% coverage.
* Use modern language and framework features (async/await, decorators, dependency injection).
* Keep `README.md` up to date with any changes.

### Error Handling

All API errors use a uniform JSON structure:

```json
{
  "statusCode": 400,
  "message": "Invalid input",
  "error": "BadRequestException",
  "path": "/customers",
  "timestamp": "2025-06-12T00:00:00.000Z"
}
```

Unknown routes return a 404 response in the same format. Invalid fields are reported with HTTP 422 while forbidden properties result in HTTP 400.

### Logging

The API uses **nestjs-pino** for structured JSON logs. Each request receives an
`X-Request-Id` header allowing correlation across services. Log lines include the
HTTP method, URL, status code, response time, and request ID. Configure log
behaviour using:

```
LOG_LEVEL=info       # minimum level
PRETTY_LOGS=true     # pretty formatting in development
```

### API Docs

Interactive Swagger UI is served at `/docs` in development. The raw OpenAPI
specification is available at `/openapi.json` and can be exported with:

```bash
npm run openapi:export
```

The JSON file is written to `api/docs/openapi.json` for CI artifacts.

## Contribution

1. Fork the repository and create a feature branch.
2. Write tests for new functionality.
3. Implement your changes.
4. Ensure all tests pass and coverage remains ≥ 80%.
5. Submit a pull request with a clear summary of your changes.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Customers API

The Customers API provides CRUD operations for customer records.

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/customers` | List all customers |
| GET | `/customers/:id` | Retrieve a customer by ID |
| POST | `/customers` | Create a new customer |
| PUT | `/customers/:id` | Update an existing customer |
| DELETE | `/customers/:id` | Remove a customer |

### Database Setup
1. `cd project_root/db && docker-compose up -d` to start PostgreSQL.
2. `npm run typeorm migration:run` to apply migrations.
3. `npm run start:dev` to run the server.
4. `npm run test:e2e` runs end-to-end tests using an in-memory SQLite database when `APP_ENV=codex`.
