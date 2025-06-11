# full-stack-app-nextjs-nestjs-baseline

A starter template for a full-stack application using Next.js for the front-end and NestJS for the back-end, with a simple database layer and AI-agent context files.

---

## Table of Contents

* [Overview](#overview)
* [Repository Structure](#repository-structure)
* [Prerequisites](#prerequisites)
* [Installation & Setup](#installation--setup)

    * [Environment Variables](#environment-variables)
    * [Database](#database)
* [Running the Application](#running-the-application)

    * [Back-end (NestJS)](#back-end-nestjs)
    * [Front-end (Next.js)](#front-end-nextjs)
* [API Reference](#api-reference)
* [AI-Agent Context](#ai-agent-context)
* [Contributing](#contributing)


---

## Overview

This repository provides a minimal, opinionated baseline for building a modern full-stack application:

* **Next.js** in `ui/` for server-rendered React pages and client navigation
* **NestJS** in `api/` for RESTful endpoints, dependency-injected modules, and TypeScript
* **Database** scripts and schemas in `db/` to version and seed your data layer
* **AGENTS.md** for AI-agent prompt templates and context, to drive automated code generators or assistants

---

## Repository Structure

```
/
├── api/               # NestJS back-end application
├── db/                # Database schema, migrations, and seed scripts
├── schemas/           # JSON Schemas that integrate UI and API apps.
├── ui/                # Next.js front-end application
├── .gitignore         # Git ignore rules
├── AGENTS.md          # Context and prompt templates for AI coding agents
└── README.md          # This file
```

---

## Prerequisites

* **Node.js** ≥ 20.x
* **npm** or **Yarn**
* **Nest CLI** (optional)
* **Next.js CLI** (optional)
* **PostgreSQL** (or another supported database)
* **Docker & Docker Compose** (for containerized local infrastructure)

---

## Installation & Setup

### Environment Variables

Copy and populate the example environment files:

```bash
cp api/.env.example api/.env
cp ui/.env.example ui/.env
```

Typical variables:

```dotenv
# api/.env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
PORT=3001

# ui/.env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Database

1. Start your database (e.g., with Docker Compose):

   ```bash
   docker-compose up -d db
   ```
2. Run migrations and seed scripts:

   ```bash
   cd db
   npm install
   npm run migrate
   npm run seed
   ```

---

## Running the Application

Open two terminals to run the back-end and front-end in parallel.

### Back-end (NestJS)

```bash
cd api
npm install
npm run start:dev
```

The NestJS server will listen on the port defined in `api/.env` (default: 3001).

### Front-end (Next.js)

```bash
cd ui
npm install
npm run dev
```

The Next.js dev server runs on [http://localhost:3000](http://localhost:3000) and proxies API calls to `NEXT_PUBLIC_API_URL`.

---

## API Reference

A basic REST API is exposed under `/api`:

* **GET** `/profile` – List all profiles
* **POST** `/profile` – Create a new profile
* **GET** `/profile/:id` – Retrieve a single profile
* **PUT** `/profile/:id` – Update a profile
* **DELETE** `/profile/:id` – Remove a profile
* **GET** `/customers` – List customers
* **POST** `/customers` – Create a customer
* **GET** `/customers/:id` – Get a customer
* **PUT** `/customers/:id` – Update a customer
* **DELETE** `/customers/:id` – Delete a customer

If Swagger is enabled, visit `http://localhost:3001/docs` to explore the API documentation.

---

## AI-Agent Context

See `AGENTS.md` for prompt templates and project conventions used by AI coding agents (e.g., Codex, Copilot, LangChain agents). It covers:

* Metadata header requirements
* Prompt templates for UI components, API controllers, and tests
* Git branching and commit conventions

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m "feat: add new endpoint"`)
4. Push to your branch (`git push origin feature/awesome`)
5. Open a Pull Request

Adhere to the coding conventions and metadata header rules defined in `AGENTS.md`.


### Customers API

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/customers` | List all customers |
| GET | `/customers/:id` | Retrieve a customer by ID |
| POST | `/customers` | Create a new customer |
| PUT | `/customers/:id` | Update an existing customer |
| DELETE | `/customers/:id` | Remove a customer |
