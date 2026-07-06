# Planner Analytics

## Overview
Anonymous analytics collection for the adaptive planner. Tracks user behavior, drop-offs, branch usage, and completion metrics. **Never includes PII** - all data aggregated with anonymous identifiers.

## Data Model

### PlannerAnalytics
```prisma
model PlannerAnalytics {
  id                String   @id @default(cuid())
  projectId         String
  questionnaireId   String
  questionKey       String
  eventType         String   // started, answered, changed, skipped, completed, dropped, resumed
  branchKey         String?
  timeSpentMs       Int?
  answerChanged     Boolean  @default(false)
  completionRate    Float?   // Aggregate: completed / started
  dropOffRate       Float?   // Aggregate: dropped / started
  dateBucket        DateTime // Day bucket for time-series
  anonymousId       String?  // Hashed: base64(projectId + sessionId)[:16]
  createdAt         DateTime @default(now())

  project       Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  questionnaire Questionnaire @relation(fields: [questionnaireId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@index([questionnaireId])
  @@index([questionKey])
  @@index([eventType])
  @@index([dateBucket])
  @@index([anonymousId])
}
```

## Event Types

| Event | Trigger | Data Captured |
|-------|---------|---------------|
| `started` | First `startPlanner` call | questionnaireId, sessionId, anonymousId |
| `answered` | Answer submitted (new) | questionKey, value, timeSpentMs, branchKey |
| `changed` | Existing answer modified | questionKey, previousValue, newValue, timeSpentMs |
| `skipped` | `isUnknown: true` submitted | questionKey, branchKey |
| `completed` | All applicable questions answered | questionnaireId, totalTimeMs, questionCount |
| `dropped` | Session abandoned (timeout) | lastQuestionKey, completedCount, timeElapsed |
| `resumed` | `resumePlanner` called | sessionId, priorCompletedCount |

## Anonymous ID Generation

```typescript
const anonymousId = `anon_${Buffer.from(
  `${projectId}-${sessionId || "temp"}`,
).toString("base64").slice(0, 16)}`;
```

- Deterministic per session
- Cannot be reversed to identify buyer
- Consistent across events for same session
- Different projects → different anonymousIds

## Key Metrics

### Per-Question Metrics
- **Time spent**: Average `timeSpentMs` per question
- **Answer rate**: `answered` / (`answered` + `skipped` + `dropped`)
- **Change rate**: `changed` / `answered`
- **Branch usage**: Count per `branchKey` per question

### Funnel Metrics
```
Started → Q1 → Q2 → Q3 → Q4 → Q5 → Q6 (Preview) → Q7... → Completed
  │       │    │    │    │    │    │              │
  ▼       ▼    ▼    ▼    ▼    ▼    ▼              ▼
100%    95%  90%  85%  80%  75%  70%            45%
```

- **Completion rate**: `completed` / `started`
- **Mandatory completion**: `mandatoryComplete` / `started`
- **Preview-to-complete**: `completed` / `mandatoryComplete`
- **Drop-off points**: Questions with highest exit rate

### Branch Coverage
```sql
SELECT branchKey, COUNT(DISTINCT anonymousId) as sessions
FROM PlannerAnalytics
WHERE eventType = 'answered'
GROUP BY branchKey
```

Shows which adaptive branches are actually triggered.

### Resume Rate
```sql
SELECT COUNT(DISTINCT anonymousId) as resumed
FROM PlannerAnalytics
WHERE eventType = 'resumed'
```
vs total sessions.

## Aggregation

### Daily Buckets
`dateBucket` = day (UTC midnight) for time-series:
- Daily completion rate
- Daily average time
- Daily branch usage

### Project-Level Aggregates
```sql
-- Completion rate by project
SELECT projectId, 
  COUNT(CASE WHEN eventType='completed' THEN 1 END) * 1.0 / 
  COUNT(CASE WHEN eventType='started' THEN 1 END) as completion_rate
FROM PlannerAnalytics
GROUP BY projectId
```

### Questionnaire Version Comparison
```sql
-- Compare v1.0 vs v1.1
SELECT questionnaireVersion,
  AVG(timeSpentMs) as avg_time,
  COUNT(CASE WHEN eventType='completed' THEN 1 END) * 1.0 / COUNT(*) as completion
FROM PlannerAnalytics
GROUP BY questionnaireVersion
```

## API Endpoints

### Track Event
```
POST /api/v1/projects/:projectId/adaptive-planner/analytics
```
Body: `PlannerAnalyticsEventDto`

### Get Aggregates (Admin)
```
GET /api/v1/admin/projects/:projectId/planner/analytics
Query: questionnaireId?, dateFrom?, dateTo?, groupBy?
```
Response: Aggregated metrics

## Privacy Compliance

### No PII Collected
- ❌ No buyer ID, email, phone, name
- ❌ No session tokens or JWTs
- ❌ No IP addresses (separate middleware)
- ✅ Anonymous ID (hashed, non-reversible)
- ✅ Project ID (for multi-tenant segregation)
- ✅ Questionnaire ID (for version comparison)

### Data Retention
- Raw events: 90 days
- Daily aggregates: 2 years
- Configured via `ANALYTICS_RETENTION_DAYS` env var

### GDPR/CCPA
- No personal data → not subject to access/deletion requests
- Anonymous ID cannot be linked to individual
- Project owner can delete their project's analytics

## Frontend Integration

### Automatic Tracking
Planner frontend should call analytics endpoint:
1. On mount: `started`
2. On answer submit: `answered` (with `timeSpentMs`)
3. On answer change: `changed` (with `previousValue`)
4. On skip: `skipped` (with `isUnknown: true`)
5. On complete: `completed`
6. On unload/timeout: `dropped` (via `beforeunload` + heartbeat)

### Time Tracking
```typescript
const questionStartTime = Date.now();
// ... user answers ...
const timeSpentMs = Date.now() - questionStartTime;
```

## Dashboard Queries

### Completion Funnel
```sql
SELECT 
  q.order,
  q.key,
  COUNT(DISTINCT a.anonymousId) as reached,
  COUNT(DISTINCT CASE WHEN a.eventType IN ('answered','skipped') THEN a.anonymousId END) as responded,
  AVG(a.timeSpentMs) as avg_time_ms
FROM Question q
LEFT JOIN PlannerAnalytics a ON q.key = a.questionKey
WHERE a.questionnaireId = 'default-v1'
GROUP BY q.order, q.key
ORDER BY q.order
```

### Branch Effectiveness
```sql
SELECT 
  a.branchKey,
  q.key as trigger_question,
  COUNT(DISTINCT a.anonymousId) as triggered,
  COUNT(DISTINCT CASE WHEN a2.eventType='answered' THEN a2.anonymousId END) as completed_branch
FROM PlannerAnalytics a
JOIN Question q ON a.questionKey = q.key
LEFT JOIN PlannerAnalytics a2 ON a.anonymousId = a2.anonymousId 
  AND a2.branchKey = a.branchKey
WHERE a.eventType = 'answered' AND a.branchKey IS NOT NULL
GROUP BY a.branchKey, q.key
```

### A/B Test Questionnaire Versions
```sql
SELECT 
  questionnaireVersion,
  COUNT(DISTINCT CASE WHEN eventType='started' THEN anonymousId END) as started,
  COUNT(DISTINCT CASE WHEN eventType='completed' THEN anonymousId END) as completed,
  AVG(totalTimeMs) as avg_completion_time
FROM (
  SELECT anonymousId, questionnaireVersion,
    MAX(CASE WHEN eventType='completed' THEN createdAt END) - 
    MIN(CASE WHEN eventType='started' THEN createdAt END) as totalTimeMs
  FROM PlannerAnalytics
  GROUP BY anonymousId, questionnaireVersion
) t
GROUP BY questionnaireVersion
```

## Configuration

```env
ANALYTICS_RETENTION_DAYS=90
ANALYTICS_AGGREGATION_CRON="0 2 * * *"  # Daily at 2 AM UTC
```

## Testing Checklist

- [ ] `started` event on first load
- [ ] `answered` with correct timeSpentMs
- [ ] `changed` with previousValue
- [ ] `skipped` with isUnknown=true
- [ ] `completed` only when all applicable done
- [ ] `dropped` on session timeout
- [ ] `resumed` on return
- [ ] Anonymous ID consistent per session
- [ ] No PII in any field
- [ ] Aggregates compute correctly