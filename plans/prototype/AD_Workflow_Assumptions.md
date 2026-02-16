# AD Workflow Assumptions — Phase 0.5 Prototype

## 1. Overview
This document captures the baseline workflow assumptions for the Athletic Director (AD) and General Manager (GM) roles, which inform the Phase 0.5 prototype.

## 2. Core Workflows
### W1: Total Compensation Review
- **User**: GM
- **Goal**: See a unified view of what an athlete "costs" across all buckets.
- **Assumptions**: 
  - Revenue Share (CAPS) and NIL (NIL Go) are the primary drivers.
  - Data is currently siloed; the dashboard must aggregate these.
  - Monthly or weekly reviews are typical.

### W2: Cap Allocation Planning
- **User**: GM / Finance
- **Goal**: Ensure the ~$20.5M cap is not exceeded while remaining competitive.
- **Assumptions**:
  - GMs need a "clear to spend" metric.
  - Scenario planning ("What if we sign X?") is a frequent manual task currently done in Excel.

### W3: Title IX Compliance Check
- **User**: AD / Compliance
- **Goal**: Monitor proportionality between men's and women's spending.
- **Assumptions**:
  - Proportionality is the key metric.
  - Real-time visibility prevents end-of-quarter "surprises".

## 3. Data Flow Assumptions (Prototype)
- Data is seeded into Firestore under the `/institutions/{id}/` subtree.
- Calculations (Total Comp, Cap % Used, Proportionality) are calculated on-the-fly or from summary docs for the prototype.
