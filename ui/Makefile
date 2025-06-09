# App: Client Profile Module
# Package: ui
# File: Makefile
# Version: 0.1.0
# Author: Bobwares
# Date: 2025-06-09T13:15:00Z
# Description: Task shortcuts for dependency management, linting, formatting, testing, and running the Next.js UI.

# ────────────────────────────────────────────────────────────────────────────────
# Configurable variables
# ────────────────────────────────────────────────────────────────────────────────
PACKAGE_MANAGER ?= npm        # Override with `make PACKAGE_MANAGER=pnpm …`
PORT            ?= 3000       # Override with `make dev PORT=4000`

# ────────────────────────────────────────────────────────────────────────────────
# Phony targets
# ────────────────────────────────────────────────────────────────────────────────
.PHONY: install dev build start lint format format-write test test-watch prepare \
        clean help

# ────────────────────────────────────────────────────────────────────────────────
# Dependency management
# ────────────────────────────────────────────────────────────────────────────────
install: ## Install all project dependencies
	$(PACKAGE_MANAGER) install

# ────────────────────────────────────────────────────────────────────────────────
# Development & production runs
# ────────────────────────────────────────────────────────────────────────────────
dev: ## Start Next.js in development mode with hot reloading
	$(PACKAGE_MANAGER) run dev -- -p $(PORT)

build: ## Compile an optimized production build
	$(PACKAGE_MANAGER) run build

start: ## Serve the pre-built production bundle
	$(PACKAGE_MANAGER) run start -- -p $(PORT)

# ────────────────────────────────────────────────────────────────────────────────
# Quality gates
# ────────────────────────────────────────────────────────────────────────────────
lint: ## Run ESLint via `next lint`
	$(PACKAGE_MANAGER) run lint

format: ## Check Prettier formatting
	$(PACKAGE_MANAGER) run format

format-write: ## Auto-fix formatting issues
	$(PACKAGE_MANAGER) run format:write

# ────────────────────────────────────────────────────────────────────────────────
# Tests
# ────────────────────────────────────────────────────────────────────────────────
test: ## Execute Jest with coverage
	$(PACKAGE_MANAGER) run test

test-watch: ## Re-run tests on file changes
	$(PACKAGE_MANAGER) run test:watch

# ────────────────────────────────────────────────────────────────────────────────
# Git hooks (Husky)
# ────────────────────────────────────────────────────────────────────────────────
prepare: ## Install Husky Git hooks
	$(PACKAGE_MANAGER) run prepare

# ────────────────────────────────────────────────────────────────────────────────
# Maintenance
# ────────────────────────────────────────────────────────────────────────────────
clean: ## Remove build artifacts
	rm -rf .next

# ────────────────────────────────────────────────────────────────────────────────
# Utilities
# ────────────────────────────────────────────────────────────────────────────────
help: ## Show this help text
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?##"} {printf "%-14s %s\n", $$1, $$2}'
