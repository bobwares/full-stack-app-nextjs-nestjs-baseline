# Front-End Application README

## Overview

This is the front-end UI for our application, built with Next.js and TypeScript. It connects to the backend API at `project_root/api` and provides:

* Rendering of React pages and components under `src/`
* Data fetching from REST endpoints (e.g. `/profile`, `/customers`)
* Client-side state management and user interactions
* Styling via Tailwind CSS

## Technology Stack

**Runtime**

* Node.js (v20 or later)

**Language**

* TypeScript (v5.x or later)

**Framework**

* Next.js (latest stable)

**Styling**

* Tailwind CSS (latest stable)

**Testing**

* Jest + React Testing Library

Refer to `package.json` for exact dependency versions.

## Prerequisites

* Node.js v20 or higher
* Access to the backend API at `project_root/api`
* Environment variables configured in a `.env.local` file

## Environment Variables

Create a `.env.local` file in the project root with entries such as:

```env
APP_ENV=development
API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Adjust values for `development`, `staging`, or `production` environments.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open your browser to `http://localhost:3000`.

## Build & Production

```bash
npm run build
npm run start
```

## Testing

```bash
npm run test
npm run test:coverage
```

## Directory Structure

```
project_root/ui/
├── public/                Static assets
├── src/
│   ├── components/        Reusable React components
│   ├── pages/             Next.js page components
│   ├── styles/            Tailwind and global styles
│   └── utils/             Shared utility functions
├── __tests__/             Integration and end-to-end tests
├── package.json
├── tsconfig.json
└── README.md
```

## Coding Conventions

* All production code resides under `src/`.
* Each file begins with a metadata header (App, Package, File, Version, Author, Date, Description).
* Follow Test-Driven Development: write tests before implementation and maintain ≥ 80% coverage.
* Use modern language features (async/await, optional chaining, nullish coalescing).
* Keep this `README.md` up to date with any changes.

## Contribution

1. Fork the repository and create a feature branch.
2. Write tests for new functionality.
3. Implement your changes.
4. Ensure all tests pass and coverage remains ≥ 80%.
5. Submit a pull request with a clear summary of your changes.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
