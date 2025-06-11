# App: Full-Stack Application
# Package: docs
# File: adr/20250611_001_environment-specific-config.md
# Version: 0.1.0
# Author: Bobwares CodeBot
# Date: 2025-06-11
# Description: Decision to configure environment-specific .env files and SQLite for codex.
#

# Environment-specific configuration

**Status**: Proposed
**Date**: 2025-06-11

## Context
The API previously loaded a single `.env` file and always connected to PostgreSQL. We now need parity across local, dev, stage, prod, and Codex environments. Codex should run with SQLite for easier testing.

## Decision
Use `@nestjs/config` to load `.env.<environment>` based on `APP_ENV`. Provide example env files for each environment. The ORM configuration checks `APP_ENV` and selects SQLite when set to `codex`, otherwise PostgreSQL.

## Consequences
* Clear environment separation and easier local setup
* Codex runs on SQLite without additional DB services
* Slightly more complex startup logic
