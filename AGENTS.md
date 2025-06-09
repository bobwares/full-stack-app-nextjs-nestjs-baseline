# Project Context

Application Name: Initial Full-Stack Application
Author: Bobwares

## Overview

This is a full-stack application. 

### Directory Structure

project_root/
    api - backend application
    ui - front-end application
    schemas - definition of objects passed between the front-end and backend apps. 



### Versioning

- create file project_root/version.md with updated version number and list of changes. Include date and time of change and branch name.
- Start version at 0.0.1
- Update version each time the code is updated.
- Update only code or configuration files that have changed.


### Documentation Expectations

* **Always include a metadata header section** at the top of every source code file.

* Definition of metadata header section:

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


### Git Workflow Conventions 

### 1. Branch Naming

Use **lower-case kebab-case** with a noun-verb prefix that describes the intent, followed by a concise summary and an optional ticket ID.

```
<type>/<short-description>-<ticket-id?>
```

| Type Prefix | Purpose                               | Example                           |
| ----------- | ------------------------------------- | --------------------------------- |
| `feat`      | New feature                           | `feat/profile-photo-upload-T1234` |
| `fix`       | Bug fix                               | `fix/login-csrf-T5678`            |
| `chore`     | Tooling, build, or dependency changes | `chore/update-eslint-T0021`       |
| `docs`      | Documentation only                    | `docs/api-error-codes-T0099`      |
| `refactor`  | Internal code change w/out behaviour  | `refactor/db-repository-T0456`    |
| `test`      | Adding or improving tests             | `test/profile-service-T0789`      |
| `perf`      | Performance improvement               | `perf/query-caching-T0987`        |

**Rules**

1. Use one branch per ticket or atomic change.
2. Do **not** commit directly to `main` or `develop`.
3. Re-base on the target branch before opening a pull request (PR).

---

### 2. Commit Message Style (Conventional Commits)

```
<type>(<optional-scope>): <short imperative summary>
<BLANK LINE>
Optional multi-line body explaining the what/why.
Wrap lines at 72 characters.
<BLANK LINE>
Refs: <ticket-id(s)>
```

* **Type**: Same prefixes as in branch naming table.
* **Scope**: Small, code-based area (e.g., `profile-ui`, `auth-service`).
* **Summary**: Start with a verb (e.g., “add”, “fix”, “remove”), no trailing period.
* **Body** (optional):

    * Explain *why* the change was needed.
    * High-level design notes, trade-offs, or follow-ups.
* **Footer** (`Refs:`): List ticket IDs or tasks that the commit closes or relates to.

**Example**

```
feat(profile-ui): add in-place address editing

Allows users to update their address directly on the Profile Overview
card without navigating to a separate page. Uses optimistic UI updates
and server-side validation.

Refs: T1234
```

---

### 3. Pull-Request Summary Template

Copy this template into the PR description. The AI agent must fill every section.

```
# Summary
<!-- One-sentence description of the change. -->

# Details
* **What was added/changed?**
* **Why was it needed?**
* **How was it implemented?** (key design points)

# Related Tickets
- T1234 Profile Overview – In-place editing
- T1300 Validation Rules

# Checklist
- [ ] Unit tests pass (`npm test` / `pytest`)
- [ ] Integration tests pass
- [ ] Linter passes (`eslint` / `ruff`)
- [ ] Documentation updated (`README.md`, API docs)

# Screenshots / Demo (if UI)
<!-- Drop short text description or links to images/videos -->

# Breaking Changes
<!-- List any backward-incompatible changes, or “None” -->
```

**PR Rules**

1. Title: `type: concise summary (ticket-id)`  → e.g. `feat: in-place address editing (T1234)`.
2. Keep PRs focused: one logical change, ≤ 400 LOC whenever reasonable.
3. Include links to relevant design docs or ADRs.
4. Assign at least one reviewer knowledgeable in the affected area.
5. Merge strategy:

    * **Squash merge** into `develop`
    * Use the PR title as the squash commit message.

Adhering to these conventions ensures the coding agent produces consistent, readable history and automates releases, changelogs, and traceability with minimal friction.

End of Document

