# Use TypeORM for Customer Persistence

**Status**: Proposed
**Date**: 2025-06-12
**Context**
The project needs to persist customer data to PostgreSQL for Task 04. Two common NestJS ORM options are TypeORM and Prisma. TypeORM packages are already included in `package.json`.
**Decision**
Use TypeORM as the ORM for the customers module and future persistence needs. It integrates well with NestJS via `@nestjs/typeorm` and matches the existing dependencies.
**Consequences**
TypeORM decorators will define entities and repository patterns. We will write migrations using TypeORM's CLI. Prisma is not used.

