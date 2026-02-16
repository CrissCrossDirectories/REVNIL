# REVNIL

**REVNIL** (domain: `revnil.com` | Marketing: `REV|NIL`) is the unified operating system for the post-House collegiate athletics economy.

[![CI Validation](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)
[![Deploy Staging](https://github.com/<OWNER>/<REPO>/actions/workflows/deploy-staging.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/deploy-staging.yml)
[![Deploy Production](https://github.com/<OWNER>/<REPO>/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/deploy-production.yml)

REVNIL provides a comprehensive platform for managing NIL collectives, athlete relationships, deal tracking, compliance workflows, and financial operations — all built on the Google Cloud / Firebase ecosystem.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Backend | Cloud Functions 2nd Gen (TypeScript) |
| Database | Cloud Firestore |
| Auth | Firebase Authentication |
| Storage | Cloud Storage for Firebase |
| Hosting | Firebase Hosting |
| Local Dev | Firebase Emulator Suite |

## Custom Roo Modes

This repository uses a workspace-level custom mode configuration in [`.roomodes`](.roomodes).

- Workspace configuration takes precedence over global Roo mode settings when slugs match.
- REVNIL mode behavior should follow [`plans/Phase0_Coding_Standards.md`](plans/Phase0_Coding_Standards.md).

### Mode List

- `revnil-orchestrator`: decomposes requests into scoped subtasks, controls status tracking, and summarizes completion against acceptance criteria.
- `revnil-developer`: implements approved subtasks with minimal, safe edits and standards compliance.
- `revnil-reviewer`: performs critical quality/security/compliance review with explicit APPROVE/BLOCK outcomes.
- `revnil-debugger`: focused root-cause diagnosis and low-risk remediation planning for defects/regressions.

### Quick-Start Workflow (This Project)

1. Start in `revnil-orchestrator` to define subtasks, boundaries, and acceptance criteria.
2. Execute implementation in `revnil-developer`, referencing [`plans/Phase0_Coding_Standards.md`](plans/Phase0_Coding_Standards.md).
3. Run `revnil-reviewer` for structured QA and explicit merge readiness decision.
4. Require human sign-off before merge.

## UI Design System (Subtask 0.5)

REVNIL now uses a Tailwind-first, shadcn-style component strategy optimized for solo-founder velocity and long-term consistency.

### Design System Philosophy

- **Semantic tokens first:** Use intent-based tokens (`background`, `foreground`, `primary`, `muted`, `destructive`) instead of hardcoded color values.
- **Composable primitives:** Build UI by combining small typed primitives in [`app/src/components/ui/`](app/src/components/ui/).
- **Layout consistency:** Shared app frame components live in [`app/src/components/layout/`](app/src/components/layout/).
- **Form consistency:** Field wrappers and section patterns live in [`app/src/components/forms/`](app/src/components/forms/).
- **Accessible by default:** Focus visibility, disabled states, alerts, and loading affordances are included in base components.

### Token + Theme Foundation

- Global semantic tokens and dark-mode-ready CSS variables are defined in [`app/src/app/globals.css`](app/src/app/globals.css).
- Tailwind semantic color + radius/shadow extensions are defined in [`app/tailwind.config.ts`](app/tailwind.config.ts).
- Class merge utility (`clsx` + `tailwind-merge`) is defined in [`app/src/lib/utils.ts`](app/src/lib/utils.ts).

### Component Usage Conventions

- Use [`app/src/components/ui/button.tsx`](app/src/components/ui/button.tsx) variants (`default`, `secondary`, `outline`, `ghost`, `destructive`) instead of custom button classes.
- Use [`app/src/components/ui/card.tsx`](app/src/components/ui/card.tsx) for section containers instead of ad-hoc bordered divs.
- Use [`app/src/components/forms/form-field.tsx`](app/src/components/forms/form-field.tsx) to standardize labels, hints, and validation messages.
- Use [`app/src/components/forms/form-section.tsx`](app/src/components/forms/form-section.tsx) for grouped form blocks.
- Use [`app/src/components/layout/page-header.tsx`](app/src/components/layout/page-header.tsx) for page-level title/subtitle/actions.
- Use [`app/src/components/layout/empty-state.tsx`](app/src/components/layout/empty-state.tsx) for blank/error/no-data placeholders.

### Where to Add New Components

- Add reusable low-level primitives to [`app/src/components/ui/`](app/src/components/ui/).
- Add page-frame and navigation scaffolding to [`app/src/components/layout/`](app/src/components/layout/).
- Add reusable form composition helpers to [`app/src/components/forms/`](app/src/components/forms/).
- Keep domain/business-specific UI in feature folders (future subtasks), composed from shared primitives.

### Do / Don’t Guidance (AI-Assisted Codegen)

**Do**

- Prefer semantic Tailwind classes (`bg-background`, `text-foreground`, `border-input`, `text-muted-foreground`).
- Compose from existing primitives before creating new components.
- Reuse form wrappers for field accessibility and validation styling.
- Preserve keyboard navigation and focus-visible behavior in all new interactive elements.

**Don’t**

- Don’t hardcode raw color classes like `text-gray-700` in new shared UI.
- Don’t duplicate button/input/card implementations inside feature files.
- Don’t bypass shared layout shell patterns for dashboard routes.
- Don’t introduce untyped, one-off UI abstractions when a primitive variant can solve the same use case.

## Project Structure

```
revnil/
├── plans/          # Architecture & planning documents
├── app/            # Next.js 14 frontend (App Router)
├── functions/      # Cloud Functions 2nd Gen (TypeScript)
├── firebase.json   # Firebase project configuration
├── firestore.rules # Firestore security rules
├── storage.rules   # Cloud Storage security rules
└── package.json    # Root package (npm workspaces)
```

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Firebase CLI** (installed as a dev dependency, or globally via `npm i -g firebase-tools`)
- **Java** >= 11 (required for Firebase Emulators)

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url> revnil
cd revnil
npm install
```

### 2. Configure Environment Variables

```bash
cp app/.env.local.example app/.env.local
# Edit app/.env.local with your Firebase project config values
```

### 3. Start Development

**Next.js dev server only:**
```bash
npm run dev
```

**Firebase Emulators only:**
```bash
npm run emulators
```

**Full local development (Next.js + Emulators):**
```bash
npm run dev:full
```

### 4. Access Local Services

| Service | URL |
|---------|-----|
| Next.js App | http://localhost:3000 |
| Emulator UI | http://localhost:4000 |
| Auth Emulator | http://localhost:9099 |
| Firestore Emulator | http://localhost:8080 |
| Functions Emulator | http://localhost:5001 |
| Storage Emulator | http://localhost:9199 |
| Hosting Emulator | http://localhost:5002 |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js app for production |
| `npm run build:functions` | Build Cloud Functions |
| `npm run emulators` | Start Firebase Emulator Suite |
| `npm run dev:full` | Start Next.js + Emulators concurrently |
| `npm run deploy` | Build and deploy to Firebase |
| `npm run lint` | Run ESLint on the Next.js app |
| `npm run typecheck` | Run TypeScript type checks for app + functions |
| `npm run test:rules` | Run Firestore security rules tests once (emulator-backed) |
| `npm run test:rules:watch` | Run Firestore security rules tests in watch mode |
| `npm run test:rules:ci` | CI-friendly Firestore rules test run with dot reporter |
| `npm run ci:lint` | CI lint stage |
| `npm run ci:typecheck` | CI typecheck stage |
| `npm run ci:build` | CI build stage (app + functions) |
| `npm run ci:test` | CI rules test stage |
| `npm run ci:verify` | Full CI verification pipeline (lint → typecheck → build → rules tests) |

## CI/CD Pipeline (Subtask 0.6)

GitHub Actions workflows are configured in [`/.github/workflows/`](.github/workflows/):

- [`ci.yml`](.github/workflows/ci.yml): validation on pull requests to `main` and pushes to `main`.
- [`deploy-staging.yml`](.github/workflows/deploy-staging.yml): deploy to staging on push to `develop` or manual dispatch.
- [`deploy-production.yml`](.github/workflows/deploy-production.yml): manual production deploy only, with explicit confirmation.

### Validation Workflow

[`ci.yml`](.github/workflows/ci.yml) runs:

1. checkout
2. Node setup (`lts/*`)
3. `npm ci`
4. lint
5. typecheck
6. app build
7. functions build
8. Firestore rules tests

Failure logs are uploaded as artifacts when available (`firestore-debug.log`, `firebase-debug.log`).

### Deploy Workflows and Environments

- **Staging workflow** uses GitHub environment: `staging`
  - Firebase target alias: `staging` (mapped in [`.firebaserc`](.firebaserc))
  - Trigger: push to `develop` or manual `workflow_dispatch`
  - Deploy scope: `hosting,functions,firestore,storage`

- **Production workflow** uses GitHub environment: `production`
  - Firebase target alias: `production` (mapped in [`.firebaserc`](.firebaserc), currently `nil-rev-prod`)
  - Trigger: manual `workflow_dispatch` only
  - Safety controls:
    - required `environment=prod` input
    - required confirmation string `DEPLOY_PRODUCTION`
  - Deploy scope: `hosting,functions,firestore,storage`

### Required Secrets

No plaintext credentials are committed to the repo. Configure secrets in GitHub **Environments**:

- Environment: `staging`
  - `FIREBASE_TOKEN`
- Environment: `production`
  - `FIREBASE_TOKEN`

Token generation command:

```bash
firebase login:ci
```

### Authentication Strategy + Migration Note

Current implementation uses `FIREBASE_TOKEN` for practical reliability.

Recommended upgrade path: migrate deploy workflows to **Workload Identity Federation** (or service account credentials) to remove long-lived CI tokens.

### Branch Strategy Recommendation

- Protect `main` (required status check: CI Validation).
- Use `develop` as the staging integration branch.
- Promote to production via manual dispatch of [`deploy-production.yml`](.github/workflows/deploy-production.yml) from reviewed commits.

### Running Deploy Workflows

1. Ensure `staging` and `production` environments exist in repository settings.
2. Add `FIREBASE_TOKEN` to each environment.
3. For staging deploy:
   - push to `develop`, or
   - manually run [`deploy-staging.yml`](.github/workflows/deploy-staging.yml).
4. For production deploy:
   - manually run [`deploy-production.yml`](.github/workflows/deploy-production.yml)
   - select `environment=prod`
   - input `DEPLOY_PRODUCTION` exactly.

## Authentication (Subtask 0.2)

REVNIL now includes Firebase Authentication wiring with tenant-scoped RBAC primitives.

### Auth Providers

- Email/Password
- Google provider

Client auth utilities are implemented in [`app/src/lib/firebase/auth.ts`](app/src/lib/firebase/auth.ts) and consumed by [`app/src/providers/auth-provider.tsx`](app/src/providers/auth-provider.tsx).

### Custom Claims Schema

Custom claims for tenant authorization use this schema:

```ts
{
  tenantType: "institution" | "collective" | "athlete" | "agent";
  tenantId: string;
  role: "admin" | "gm" | "compliance" | "finance" | "coach" | "viewer";
  linkedTenants?: string[];
}
```

Server-side helpers also support a separate `platformAdmin: boolean` claim used only to authorize privileged claim mutation endpoints.

### App Auth Flow

- Login page: [`app/src/app/login/page.tsx`](app/src/app/login/page.tsx)
- Protected dashboard route group guard: [`app/src/app/(dashboard)/layout.tsx`](app/src/app/(dashboard)/layout.tsx)
- Guard component: [`app/src/components/auth/auth-guard.tsx`](app/src/components/auth/auth-guard.tsx)
- Dashboard shell proof route: [`app/src/app/(dashboard)/dashboard/page.tsx`](app/src/app/(dashboard)/dashboard/page.tsx)

Unauthenticated users are redirected to `/login?next=...`.

### Functions Endpoints for Claims

Cloud Functions module: [`functions/src/auth/index.ts`](functions/src/auth/index.ts)

- Callable: `auth-setUserClaims`
- Callable: `auth-getUserClaims`
- HTTP: `auth-setUserClaimsHttp` (`POST`)
- HTTP: `auth-getUserClaimsHttp` (`GET ?uid=...`)

Implementation notes:

- Claim payload is validated server-side before mutation.
- Caller identity is verified from Firebase Auth token.
- `setUserClaims` operations require `platformAdmin === true` on caller claims.
- `getUserClaims` operations require `platformAdmin === true` OR role `compliance`.

### Local Emulator Setup (Exact Steps)

1. Copy env template and populate Firebase web config:

   ```bash
   cp app/.env.local.example app/.env.local
   ```

2. Ensure [`app/.env.local.example`](app/.env.local.example) equivalent values exist in `app/.env.local`:

   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true`

3. Start emulators:

   ```bash
   npm run emulators
   ```

4. In another terminal, start Next.js app:

   ```bash
   npm run dev
   ```

5. Open app:

   - App: `http://localhost:3000`
   - Emulator UI: `http://localhost:4000`

6. Create a test user in Auth Emulator UI, then sign in from `/login`.

### Bootstrap Platform Admin (Guidance)

No hardcoded bypass is included. To bootstrap the first platform admin safely:

1. Create the initial trusted user in Firebase Auth Emulator (or Firebase Auth in non-local environments).
2. Use Firebase Admin SDK from a secure local one-off script/REPL (or Firebase Console custom claims tooling) to set:

   ```json
   {
     "tenantType": "institution",
     "tenantId": "bootstrap",
     "role": "admin",
     "platformAdmin": true
   }
   ```

3. Force token refresh/re-login for that user before calling claims admin endpoints.

This preserves separation of authentication (identity) from authorization (claims/policies) without introducing insecure backdoors.

## Data Integration Strategy (Static-First, API-Ready)

## Observability Baseline (Subtask 0.7)

Phase 0 observability foundations are now in place for Cloud Functions and the Next.js app.

### Implementation References

- Functions structured logger: [`functions/src/shared/logger.ts`](functions/src/shared/logger.ts)
- Functions error normalization utilities: [`functions/src/shared/errors.ts`](functions/src/shared/errors.ts)
- Auth function instrumentation examples: [`functions/src/auth/index.ts`](functions/src/auth/index.ts)
- Shared auth verification logging hooks: [`functions/src/shared/auth.ts`](functions/src/shared/auth.ts)
- App observability logger: [`app/src/lib/observability/logger.ts`](app/src/lib/observability/logger.ts)
- App error normalization/reporting utility: [`app/src/lib/observability/errors.ts`](app/src/lib/observability/errors.ts)
- App auth instrumentation points:
  - [`app/src/providers/auth-provider.tsx`](app/src/providers/auth-provider.tsx)
  - [`app/src/components/auth/login-form.tsx`](app/src/components/auth/login-form.tsx)
  - [`app/src/components/auth/auth-guard.tsx`](app/src/components/auth/auth-guard.tsx)

### Logging Schema (Core Fields)

Logs are structured JSON and include:

- `severity`
- `event`
- `service`
- `module`
- `timestamp`
- optional correlation/context: `requestId`, `sessionId`, `tenantType`, `tenantId`, `uid`, `role`

Sensitive values (tokens/secrets/credentials/raw PII-like keys) are redacted by logger utilities.

### Environment Behavior

- App dev mode: grouped human-readable console logs
- App production mode: JSON structured logs for cloud ingestion
- Functions: JSON structured logs with redaction in all environments

### Monitoring + Alerting Setup Guidance

Runbook with suggested SLOs, alert strategy, and gcloud templates:

- [`plans/Phase0_Observability_Runbook.md`](plans/Phase0_Observability_Runbook.md)

This includes templates for:

- log-based metric creation
- alert policy scaffolding
- incident triage + rollback basics
- local/emulator observability validation steps

## Firestore Security Rules Tests (Subtask 0.4)

Rules tests are implemented with `@firebase/rules-unit-testing` and run against the local Firestore emulator using the current [`firestore.rules`](firestore.rules).

### Test Suite Location

- [`tests/firestore-rules/helpers.ts`](tests/firestore-rules/helpers.ts)
- [`tests/firestore-rules/firestore.rules.test.ts`](tests/firestore-rules/firestore.rules.test.ts)
- [`vitest.rules.config.ts`](vitest.rules.config.ts)

### Prerequisites

- Install dependencies:

  ```bash
  npm install
  ```

- Ensure Java 11+ is installed (Firestore emulator requirement).

### Run Rules Tests Locally

One-time run:

```bash
npm run test:rules
```

Watch mode:

```bash
npm run test:rules:watch
```

CI-style run (deterministic reporter and explicit project):

```bash
npm run test:rules:ci
```

### Covered Rule Areas

- Tenant isolation for institution, collective, and athlete tenant subtrees.
- Institution role-gated writes:
  - `admin|gm` for `roster`
  - `admin|finance` for `capManagement`
  - `admin|compliance` for `riskAlerts` and `imports`
- Consent-gated cross-tenant reads (institution/collective/agent), including missing/revoked consent denies.
- Agent linked-tenant constraints (positive and negative linkage).
- Connect module constraints for conversations/messages participants and user-scoped notifications.
- Deny-by-default sanity checks, including unauthenticated denies.

## Firestore Model + Security Policy (Subtask 0.3)

Canonical Firestore skeleton for Phase 0/1 readiness:

```text
/institutions/{institutionId}
  /profile/{doc}
  /config/{doc}
  /roster/{athleteId}
  /capManagement/{doc}
  /titleIX/{doc}
  /riskAlerts/{alertId}
  /imports/{importId}

/collectives/{collectiveId}
  /profile/{doc}
  /deals/{dealId}
  /activations/{activationId}
  /donors/{donorId}
  /financials/{doc}

/athletes/{athleteId}
  /profile/{doc}
  /income/{doc}
  /deals/{dealId}
  /consent/{doc}

/connect
  /conversations/{conversationId}/messages/{messageId}
  /notifications/{userId}/{notificationId}
```

Security policy is implemented in [`firestore.rules`](firestore.rules):

- Deny-by-default fallback for all unmatched paths.
- Claim validation gates all access: `tenantType`, `tenantId`, `role` must exist and be valid.
- Strict tenant isolation:
  - institution users can access only `/institutions/{tenantId}/...`
  - collective users can access only `/collectives/{tenantId}/...`
  - athlete users can access only `/athletes/{tenantId}/...`
  - agents have no broad subtree access.
- Consent-gated cross-tenant athlete reads using docs in `/athletes/{athleteId}/consent/{tenantType}_{tenantId}`.
- Institution role split for sensitive writes:
  - `admin|compliance` can write `riskAlerts` and `imports`
  - `admin|finance` can write `capManagement`
  - `admin|gm` can write `roster`

Consent assumptions used by rules and types:

- Required fields: `athleteId`, `tenantType`, `tenantId`, `granted`
- Optional revocation flag: `revoked`
- Permissions are map-only for rule evaluation: `permissions.readProfile`, `permissions.readDeals`, `permissions.readAll`
- Consent document ID must remain `{tenantType}_{tenantId}` (example: `collective_col-1`)

Indexes are initialized in [`firestore.indexes.json`](firestore.indexes.json) for expected Phase 0/1 query patterns:

- roster list filtering (`status`, `sport`, `updatedAt`)
- deals filtering (`athleteId`, `status`, `createdAt`)
- risk alerts filtering (`severity`, `status`, `createdAt`)
- connect messages timeline (`conversationId`, `sentAt`)

Developer-facing schema + seed examples are documented in [`plans/Phase0_Firestore_Model.md`](plans/Phase0_Firestore_Model.md).

REVNIL is designed to support early adoption **without requiring API access on day one**.

- **Phase 0 (Current):** Infrastructure-first foundation using Firebase + Next.js.
- **Phase 0.5 (Prototype):** Functional GM dashboard with Title IX and Cap monitoring.
- **Phase 1 (Early Adopters):** File-based ingestion from static exports/dumps (CSV, XLSX, JSON, and similar formats).
- **Phase 2 (Hybrid):** Mixed model where some data flows via file imports and some via APIs.
- **Phase 3 (Mature):** Full API-based integrations for institutions and NIL entities that enable direct system access.

Planned implementation pattern:

1. **Canonical internal schema** in Firestore.
2. **Source adapters** that map incoming file columns/fields to canonical fields.
3. **Reusable mapping templates** saved per institution/entity.
4. **Validation + import jobs** with audit trails and error reporting.
5. **Seamless transition to API connectors** by reusing the same canonical schema and validation layer.

This allows institutions to onboard immediately with the data they already have, then move to API automation later without re-platforming.

## Architecture

See [`plans/REVNIL_Master_Plan.md`](plans/REVNIL_Master_Plan.md) for the full system architecture and master plan.

## License

Proprietary — All rights reserved.
