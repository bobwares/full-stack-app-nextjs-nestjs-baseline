# Coding Rules

---

## 1 · Formatting & Tooling Baseline

| Area                        | Mandatory Tooling / Config                                                   | Key Enforced Settings                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript / TypeScript** | **ESLint + Prettier** (monorepo-wide)                                        | • ESLint shareable configs: `@typescript-eslint/recommended`, `eslint-config-next`, Airbnb base rules <br>• `prettier --write` on staged files (husky + lint-staged) |
| **React / Next.js**         | `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` | • Warn on missing `key` props <br>• Error on missing dependency arrays in hooks <br>• Enforce accessible labels and alt text                                         |
| **Nest JS**                 | `@nestjs/eslint-plugin`                                                      | • Enforce layered architecture (controllers → services → repositories) <br>• Disallow circular imports                                                               |

---

## 2 · TypeScript Rules

1. **Strict mode** in `tsconfig.json`:

   ```jsonc
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitOverride": true,
       "exactOptionalPropertyTypes": true
     }
   }
   ```
2. **No `any`** outside `// TODO(temp-any)` placeholders.
3. Prefer **type-only imports** (`import type …`).
4. Enum-like values → `const enum` *or* union literals (`type Status = 'open' | 'closed'`).
5. **Named exports only**—`export default` is disallowed.

---

## 3 · React Guidelines

| Topic            | Rule                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| Components       | Function components only.                                                                       |
| Hooks            | Derive state via hooks; never mutate props.                                                     |
| State management | Local: `useState` / `useReducer`; Global: Zustand or Context API (Redux only if required).      |
| CSS              | Tailwind utility classes; compose with `clsx`. No inline style objects except dynamic geometry. |
| File naming      | `PascalCase.tsx` for components; colocate `Component.module.css` and tests.                     |

---

## 4 · Next .js Conventions (App Router)

1. **Directory layout**

   ```
   apps/web/
     app/                  # Route segments
       page.tsx
       layout.tsx
       (marketing)/…
     public/
     lib/
   ```
2. Data fetching is **static-first** (`generateStaticParams`, `fetch` { cache: 'revalidate' }).
3. Prefer **Edge Runtime** for latency-sensitive endpoints.
4. Favor **Nest JS back-end**; keep `/api/*` routes thin.

---

## 5 · Nest JS Standards

| Layer                 | Mandatory Practice                                              |
| --------------------- | --------------------------------------------------------------- |
| Modules               | One bounded-context per module; avoid “God” modules.            |
| Controllers           | Pure I/O mapping—no business logic.                             |
| Services              | Business rules; stateless and idempotent.                       |
| Repositories / Prisma | Persistence only; never expose ORM entities past service layer. |
| DTOs & Validation     | Validate all inputs via `class-validator` pipes.                |

---

## 6 · Unit & Integration Testing Rules

| Scope                       | Tooling & Location                                                                                 | Requirements                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Unit tests**              | **Jest** (monorepo root) <br>Files: `*.test.ts` / `*.test.tsx` beside source or under `__tests__/` | • Target isolated functions/components <br>• No external I/O <br>• Use `ts-jest` preset <br>• Aim ≥ 90 % line coverage |
| **Integration / API tests** | **Supertest** against Nest JS app                                                                  | • Spin up app with in-memory DB (`IN_MEMORY_DB=true`) <br>• Verify full request/response paths                         |
| **E2E (UI) tests**          | **Playwright** under `e2e/`                                                                        | • Test critical user flows in headless Chromium <br>• Parallel spec execution enabled                                  |
| **Mocking**                 | `vi.fn()` / `jest.fn()` only; avoid global mocks unless essential                                  | • Clear mocks after each test (`afterEach(jest.resetAllMocks)`)                                                        |
| **Test data**               | Builders or factories (e.g., `@jackfranklin/test-data-bot`)                                        | • No hard-coded IDs; use generated values                                                                              |
| **Naming**                  | Tests describe behaviour, not implementation                                                       | • `describe('UserService.create')` …                                                                                   |
| **Reporting**               | Jest HTML or JUnit output published by CI                                                          | • Fails build if coverage < 90 % overall or < 80 % per file                                                            |



## 8 · Dependency Version Pinning

| Runtime     | Minimum Version                        | Lock File           |
| ----------- | -------------------------------------- | ------------------- |
| Node.js     | **20.x** (LTS)                         | `package-lock.json` |
| npm         | 10.x                                   | same                |
| pnpm / yarn | Optional; keep homogeneous across repo |                     |

---

## 9 · Documentation Expectations

* **Always include a metadata header section** at the top of every source code file.

* Definition of metadata header section:

  ```markdown
  # App: {{Application Name}}
  # Package: {{package}}
  # File: {{file name}}
  # Version: 2.0.29
  # Author: Bobwares
  # Date: {{current date/ time}}
  # Description: document the function of the code.
  #
  ```

* Maintain Architecture Decision Records under `/docs/adr/####-title.md`.

* Update `version.md` on each merge to `main`.

EOF