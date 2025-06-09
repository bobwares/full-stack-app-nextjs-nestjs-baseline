# App: Client Profile Module
# Package: api
# File: Makefile
# Version: 0.0.9
# Author: Bobwares
# Date: 2025-06-08T09:30:00Z
# Description: Task shortcuts for building, starting, testing, and installing the NestJS API.

SHELL := /usr/bin/env bash

.PHONY: all build format start start-dev start-debug start-prod lint test test-watch test-cov test-debug test-e2e clean

# Default target
all: build

# Compile the project
build:
	npm run build

# Apply Prettier formatting
format:
	npm run format

# Run in production mode
start:
	npm run start

# Run in watch mode for development
start-dev:
	npm run start:dev

# Run in debug mode with watch
start-debug:
	npm run start:debug

# Start the built app (assumes dist/ exists)
start-prod:
	npm run start:prod

# Lint and auto‐fix
lint:
	npm run lint

# Run Jest tests once
test:
	npm run test

# Run Jest in watch mode
test-watch:
	npm run test:watch

# Run Jest and output coverage report
test-cov:
	npm run test:cov

# Run Jest in debug mode
test-debug:
	npm run test:debug

# Run end-to-end tests
test-e2e:
	npm run test:e2e

# Remove build artifacts
clean:
	rm -rf dist
