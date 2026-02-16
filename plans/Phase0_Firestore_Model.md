# Phase 0 Firestore Model Reference

This document provides a developer-facing reference for the Phase 0/1 Firestore schema skeleton used in REVNIL.

## Canonical Path Skeleton

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
  /consent/{tenantType_tenantId}

/connect/conversations/{conversationId}
  /messages/{messageId}

/connect/notifications/{userId}/{notificationId}
```

## Consent Document Contract (Assumed for Rules)

Consent docs are stored at:

`/athletes/{athleteId}/consent/{tenantType}_{tenantId}`

Required fields:

- `athleteId: string`
- `tenantType: "institution" | "collective" | "agent"`
- `tenantId: string`
- `granted: boolean`

Optional fields:

- `revoked: boolean`
- `permissions: { readProfile?: boolean; readDeals?: boolean; readAll?: boolean }`
- legacy compatibility booleans: `readProfile`, `readDeals`
- `expiresAt`

## Seed / Example Documents (non-runtime)

### Institution Profile

Path: `/institutions/inst_ut_austin/profile/main`

```json
{
  "institutionId": "inst_ut_austin",
  "name": "University of Texas at Austin",
  "conference": "SEC",
  "division": "D1",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

### Institution Roster Entry

Path: `/institutions/inst_ut_austin/roster/athlete_001`

```json
{
  "institutionId": "inst_ut_austin",
  "athleteId": "athlete_001",
  "sport": "football",
  "status": "active",
  "updatedAt": "2026-01-02T10:00:00.000Z"
}
```

### Collective Deal

Path: `/collectives/collective_lonestar/deals/deal_001`

```json
{
  "collectiveId": "collective_lonestar",
  "athleteId": "athlete_001",
  "institutionId": "inst_ut_austin",
  "status": "active",
  "value": 25000,
  "createdAt": "2026-01-03T11:00:00.000Z"
}
```

### Athlete Profile

Path: `/athletes/athlete_001/profile/main`

```json
{
  "athleteId": "athlete_001",
  "fullName": "Jordan Sample",
  "sport": "football",
  "institutionId": "inst_ut_austin",
  "updatedAt": "2026-01-03T11:05:00.000Z"
}
```

### Athlete Consent to Institution

Path: `/athletes/athlete_001/consent/institution_inst_ut_austin`

```json
{
  "athleteId": "athlete_001",
  "tenantType": "institution",
  "tenantId": "inst_ut_austin",
  "granted": true,
  "permissions": {
    "readProfile": true,
    "readDeals": true
  },
  "revoked": false,
  "updatedAt": "2026-01-03T11:10:00.000Z"
}
```

### Connect Conversation

Path: `/connect/conversations/convo_001`

```json
{
  "conversationId": "convo_001",
  "participantUids": ["uid_athlete_001", "uid_gm_001"],
  "tenantRefs": ["athlete:athlete_001", "institution:inst_ut_austin"],
  "lastMessageAt": "2026-01-03T12:00:00.000Z"
}
```

### Connect Message

Path: `/connect/conversations/convo_001/messages/msg_001`

```json
{
  "conversationId": "convo_001",
  "senderUid": "uid_athlete_001",
  "body": "Can we review my current deal terms?",
  "sentAt": "2026-01-03T12:00:00.000Z"
}
```
