# REVNIL Phase 0 Coding Standards

This document defines enforceable coding standards for REVNIL’s AI-assisted workflow.

## 1) TypeScript Conventions

- `strict` mode is required in all TypeScript projects.
- Do not use `any` unless there is a documented justification in code comments.
- Prefer `unknown` + runtime narrowing over `any`.
- Exported functions, class members, and public module APIs must have explicit types.
- Reuse shared domain types from [`app/src/types/index.ts`](app/src/types/index.ts) and shared function types in [`functions/src/shared/types.ts`](functions/src/shared/types.ts).
- Avoid unsafe casts (`as`) unless preceded by validation or guard logic.

## 2) Next.js Conventions

- Use App Router patterns under [`app/src/app/`](app/src/app/).
- Default to Server Components; use Client Components only when browser-only APIs or interactivity require it.
- Add `"use client"` only at the leaf boundary where needed.
- Keep server/client boundaries explicit; do not import server-only utilities into client modules.
- Keep route-level layouts/pages focused on composition, with reusable UI in [`app/src/components/`](app/src/components/).

## 3) Firebase / Cloud Functions Conventions

- Validate every external input (callable, HTTP, or event payload) before business logic.
- Enforce authn/authz checks before data access or mutations.
- Use structured logging for each operation with correlation metadata when available.
- Normalize errors and return safe, non-sensitive error messages to clients.
- Prefer shared helpers in [`functions/src/shared/auth.ts`](functions/src/shared/auth.ts), [`functions/src/shared/errors.ts`](functions/src/shared/errors.ts), and [`functions/src/shared/logger.ts`](functions/src/shared/logger.ts).

## 4) Security Conventions

- Never commit secrets, tokens, private keys, or credentials.
- Store configuration in environment variables and checked-in examples only.
- Apply least privilege for IAM, claims, and rules access.
- Treat PII as sensitive: collect minimum required fields and avoid logging raw PII.
- Redact sensitive values in logs and error payloads.

## 5) Firestore Conventions

- Follow canonical collection structure from [`plans/Phase0_Firestore_Model.md`](plans/Phase0_Firestore_Model.md).
- Document shape must be stable and explicitly typed.
- Include audit timestamps (`createdAt`, `updatedAt`) on persisted domain documents.
- Keep denormalization intentional: only duplicate fields for query/performance needs.
- Use consistent naming:
  - collections/doc IDs: `camelCase` for fields, kebab-like IDs only when semantically needed
  - consent doc ID format: `{tenantType}_{tenantId}`

## 6) UI Conventions

- Use semantic design tokens from [`app/src/app/globals.css`](app/src/app/globals.css) and Tailwind config.
- Reuse primitives in [`app/src/components/ui/`](app/src/components/ui/) before creating new components.
- Reuse form/layout patterns in [`app/src/components/forms/`](app/src/components/forms/) and [`app/src/components/layout/`](app/src/components/layout/).
- Accessibility is mandatory: keyboard navigation, focus-visible states, label association, and meaningful status/alert text.

## 7) Testing Conventions

- Security rules changes require rules tests in [`tests/firestore-rules/firestore.rules.test.ts`](tests/firestore-rules/firestore.rules.test.ts).
- New non-trivial utilities should include unit tests where feasible.
- Integration-level behavior changes should include at least one integration test strategy note in PR description.
- No merge with failing lint/typecheck/build/test stages.

## 8) CI Conventions

- `npm run ci:verify` must pass locally (or in CI) before merge.
- Pull requests must be green on required checks before approval.
- Build artifacts/logs should be reviewed when failures occur, then linked in PR notes if relevant.

## 9) Git / PR Conventions

- Branch naming:
  - `feat/<short-scope>`
  - `fix/<short-scope>`
  - `chore/<short-scope>`
  - `docs/<short-scope>`
- Commit style: concise imperative subject line with scope when helpful (example: `docs: add Roo custom modes and standards`).
- PRs must include:
  - summary of change
  - scope boundaries (what is not changed)
  - validation evidence (commands run/results)
  - risk/rollback note for production-impacting changes

## 10) AI-Assisted Workflow Conventions

- Default workflow: **orchestrator → developer → reviewer**.
- Orchestrator must define scoped subtasks and explicit acceptance criteria.
- Developer executes only approved scope and references this standards document.
- Reviewer provides explicit **Approve** or **Block** with concrete findings.
- Human sign-off is required before merge for impactful changes.

## Definition of Done (Template)

Use this checklist in PRs/issues:

- [ ] Scope implemented exactly as defined
- [ ] No unrelated code changes
- [ ] Type safety preserved (`strict`, no unjustified `any`)
- [ ] Security/auth checks and input validation applied
- [ ] Tests added/updated as required
- [ ] `npm run ci:verify` passes
- [ ] Reviewer outcome recorded (Approve/Block)
- [ ] Human sign-off completed

