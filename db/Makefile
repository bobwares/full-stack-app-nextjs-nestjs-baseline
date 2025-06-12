# App: Full-Stack Application
# Package: db
# File: Makefile
# Version: 0.1.1
# Author: AI Agent
# Date: 2025-06-12T22:25:03Z
# Description: Task runner for database migrations and test data scripts.
#
SHELL := /usr/bin/env bash
POSTGRES_USER ?= $$POSTGRES_USER
POSTGRES_DB ?= $$POSTGRES_DB
COMPOSE ?= docker compose

MIGRATIONS := $(shell ls migrations/*.sql 2>/dev/null | sort | xargs -n1 basename)
TEST_SCRIPTS := $(shell ls test/*.sql 2>/dev/null | sort | xargs -n1 basename)

.PHONY: migrate test-data db-test

migrate:
	@for file in $(MIGRATIONS); do \
	$(COMPOSE) exec db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB) -f /docker-entrypoint-initdb.d/migrations/$$file || exit $$?; \
done

test-data:
	@for file in $(TEST_SCRIPTS); do \
	$(COMPOSE) exec db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB) -f /docker-entrypoint-initdb.d/test/$$file || exit $$?; \
done

db-test: migrate test-data

