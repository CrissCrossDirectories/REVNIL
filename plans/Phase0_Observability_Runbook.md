# Phase 0 Observability Runbook (Subtask 0.7)

This runbook defines the baseline observability posture for REVNIL on Firebase Hosting + Cloud Functions (2nd gen) + Next.js.

## 1) Logging Conventions

Structured logs should use JSON with these required fields:

- `severity` (`INFO` | `WARNING` | `ERROR` | `NOTICE`)
- `event` (stable event name, dot-notated)
- `service` (`revnil-functions` or `revnil-app`)
- `module` (domain/auth component)
- `timestamp` (ISO8601)

Recommended contextual fields when available:

- `requestId` (from `x-request-id` or `x-cloud-trace-context`)
- `sessionId` (app/browser session correlation)
- `tenantType`, `tenantId`, `uid`, `role`

### Safe Logging / Redaction Rules

Never emit raw secrets or sensitive payloads. Redact keys matching patterns like:

- `authorization`, `token`, `password`, `secret`, `api_key`, `cookie`
- direct PII fields such as `email`, `phone`, `ssn`
- raw contract blobs or full document payloads

Allowed pattern: log metadata and IDs, not full source payloads.

## 2) Severity Taxonomy

- `INFO`: expected lifecycle events (auth success, route checks, request starts)
- `NOTICE` (audit): security/authorization significant outcomes (claims mutated)
- `WARNING`: policy denials, recoverable bad input, redirect/guard denials
- `ERROR`: unhandled failures or endpoint failures returned to caller

## 3) Error Budget + Initial SLO Suggestions

Initial SLOs for Phase 0 (adjust after 2–4 weeks of traffic):

- **Functions availability SLO**: 99.5% successful requests (5xx excluded from success)
- **Functions latency SLO**: p95 < 1200ms for key auth/claims endpoints
- **Hosting reliability SLO**: 99.9% non-5xx responses

Simple error budget framing:

- Monthly error budget for 99.5% SLO ≈ 0.5% failed requests
- Alert when burn rate indicates exhaustion risk in < 7 days

## 4) Suggested Monitoring + Alert Policies

### A. Functions Error Rate Spike

- Signal: function invocation failures / total invocations
- Example threshold: > 2% for 5m
- Notify: on-call channel + incident ticket

### B. Functions Latency p95 Regression

- Signal: execution latency p95
- Example threshold: p95 > 1500ms for 10m

### C. Firestore Permission Denied Spike

- Signal: count of denied/permission errors from Firestore logs
- Example threshold: > 30/min for 10m

### D. Hosting 5xx Spike

- Signal: hosting response 5xx count or rate
- Example threshold: > 1% for 10m

## 5) gcloud Command Templates (Scaffolding)

These are templates; replace placeholders before execution.

```bash
# Shared variables
export PROJECT_ID="<gcp-project-id>"
export REGION="us-central1"
export CHANNEL="projects/${PROJECT_ID}/notificationChannels/<channel-id>"
```

### A. Log-based metric for Functions errors

```bash
gcloud logging metrics create revnil_functions_errors_count \
  --project="${PROJECT_ID}" \
  --description="Count Cloud Functions 2nd gen errors for REVNIL" \
  --log-filter='resource.type="cloud_run_revision" AND labels."run.googleapis.com/service_name"=~"auth|gm|collective|athlete|connect|ai|integrations" AND severity>=ERROR'
```

### B. Log-based metric for Firestore permission denied

```bash
gcloud logging metrics create revnil_firestore_permission_denied_count \
  --project="${PROJECT_ID}" \
  --description="Count Firestore permission denied events" \
  --log-filter='resource.type="firestore_database" AND (textPayload:"PERMISSION_DENIED" OR jsonPayload.message:"PERMISSION_DENIED")'
```

### C. Alert policy template (from JSON)

```bash
gcloud alpha monitoring policies create \
  --project="${PROJECT_ID}" \
  --policy-from-file="./plans/monitoring/functions-error-rate-policy.example.json"
```

Example policy skeleton (save as shown above and customize):

```json
{
  "displayName": "REVNIL - Functions Error Rate High",
  "combiner": "OR",
  "conditions": [
    {
      "displayName": "Functions errors above threshold",
      "conditionThreshold": {
        "filter": "metric.type=\"logging.googleapis.com/user/revnil_functions_errors_count\"",
        "comparison": "COMPARISON_GT",
        "thresholdValue": 10,
        "duration": "300s",
        "trigger": { "count": 1 },
        "aggregations": [
          {
            "alignmentPeriod": "60s",
            "perSeriesAligner": "ALIGN_RATE"
          }
        ]
      }
    }
  ],
  "notificationChannels": ["${CHANNEL}"]
}
```

## 6) Incident Response Basics

1. **Triage + scope**
   - Confirm blast radius (single tenant/module vs platform-wide)
   - Check latest deploy and config changes
2. **Logs first**
   - Query by `event`, `service`, `module`, `requestId`, `tenantId`
   - Identify first failing event and related upstream/downstream events
3. **Mitigation**
   - Roll back latest deployment when correlated
   - Disable risky feature flags (if available)
4. **Recovery validation**
   - Confirm alert clears and error logs return to baseline
5. **Post-incident**
   - Capture timeline, root cause, and action items in runbook notes

### Rollback Path (Phase 0)

- Re-deploy last known good commit via existing GitHub Actions deploy workflow.
- If emergency-only, perform targeted Firebase deploy from known-good branch/tag.

## 7) Local / Dev Observability Guidance

- App logger behavior:
  - dev: grouped console logs for readability
  - prod build/runtime: JSON structured logs for cloud ingestion
- Functions logger behavior:
  - JSON logs with redaction enabled by default
- During emulator testing:
  - inject or simulate `x-request-id` when testing HTTP functions
  - verify logs contain `event`, `module`, `requestId`, and tenant context
- Avoid logging raw credentials in local debug output as strictly as production.

