# Adaptive Planner

## Overview
The Adaptive Planner is a configuration-driven questionnaire system that replaces the static 7-question planner with a dynamic, branching questionnaire. It balances buyer experience (minimal mandatory questions, progressive disclosure) with sales intelligence (deep buyer understanding through adaptive branches).

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AdaptivePlannerService                   │
├─────────────────────────────────────────────────────────────┤
│  getQuestionnaire()    - Returns questionnaire definition   │
│  startPlanner()        - Initialize/resume session          │
│  submitAnswer()        - Save answer, get next question     │
│  resumePlanner()       - Resume from session                │
│  generatePreview()     - Personalized preview after Q6      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Questionnaire Storage                   │
│  - Database: Questionnaire, Question, Branch models         │
│  - Developer-level defaults + Project-specific overrides    │
│  - Versioned (semantic versioning)                          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Answer Persistence                      │
│  - PlannerAnswer model (per buyer, per session)             │
│  - Tracks: value, isUnknown, timeSpentMs, branchPath        │
│  - Distinguishes UNKNOWN from FALSE (critical for rules)    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Event Emission                          │
│  - planner.started    (session begins)                       │
│  - planner.answered   (each answer submitted)                │
│  - planner.changed    (answer modified)                      │
│  - planner.completed  (all applicable questions answered)    │
│  - Emitted via NestJS EventEmitter2                          │
└─────────────────────────────────────────────────────────────┘
```

## Questionnaire Structure

### Mandatory Questions (6) - Always Asked First

| Order | Key | Label | Type | Category | Options |
|-------|-----|-------|------|----------|---------|
| 1 | `household` | Who will live here? | single | household | Just Me, Couple, Couple + Child, Family, Joint Family, Buying as Investment |
| 2 | `purpose` | Why are you buying? | single | lifestyle | First Home, Upgrading, Investment, Parents, Holiday Home |
| 3 | `priorities` | Choose TWO things that matter most | multi | design | More Storage, Bigger Kitchen, Home Office, Spacious Living Room, Kids Space, Balcony, Premium Interiors, Low Maintenance, Natural Light, Privacy |
| 4 | `interior_budget` | Interior Budget | slider | financial | ₹2L–₹50L+ (step ₹1L) |
| 5 | `interior_style` | Interior Style | single | design | Scandinavian, Modern Luxury, Contemporary, Warm Indian, Minimalist, Industrial |
| 6 | `move_in_timeline` | Move-in Timeline | single | lifestyle | Immediately, Within 3 Months, 3–6 Months, 6–12 Months, Just Exploring |

### Adaptive Questions (9) - Asked Based on Branching Logic

| Order | Key | Trigger (dependsOn) | Branch |
|-------|-----|---------------------|--------|
| 7 | `children_ages` | household ∈ [Couple + Child, Family, Joint Family] | household |
| 8 | `senior_count` | household ∈ [Family, Joint Family] | household |
| 9 | `pet_count` | (always optional) | household |
| 10 | `work_from_home` | priorities contains "office" | lifestyle |
| 11 | `hosting_frequency` | priorities contains "living_room" | lifestyle |
| 12 | `cooking_frequency` | priorities contains "kitchen" | lifestyle |
| 13 | `color_preference` | (always optional) | design |
| 14 | `material_preference` | interior_style ≠ "industrial" | design |
| 15 | `investment_horizon` | purpose = "Investment" | investment |

### Branching Operators
- `eq`: exact match
- `neq`: not equal
- `in`: value in array
- `contains`: array contains value (for multi-select)

## Answer Persistence

### PlannerAnswer Model
```prisma
model PlannerAnswer {
  id                String   @id @default(cuid())
  buyerId           String
  projectId         String
  sessionId         String?
  questionnaireId   String
  questionKey       String
  value             Json
  valueType         String   // string, number, boolean, array
  isUnknown         Boolean  @default(false)  // Critical: UNKNOWN ≠ FALSE
  plannerVersion    String   @default("1.0")
  questionnaireVersion String @default("1.0")
  branchPath        String?  // JSON path of branch taken
  timeSpentMs       Int?
  answeredAt        DateTime @default(now())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  buyer       Buyer          @relation(fields: [buyerId], references: [id], onDelete: Cascade)
  project     Project        @relation(fields: [projectId], references: [id], onDelete: Cascade)
  session     BuyerSession?  @relation(fields: [sessionId], references: [id], onDelete: SetNull)
  questionnaire Questionnaire @relation(fields: [questionnaireId], references: [id], onDelete: Cascade)
}
```

### isUnknown Flag
Critical distinction for rule evaluation:
- `isUnknown: true` = Buyer explicitly skipped/declined to answer
- `isUnknown: false` + value = Buyer provided an answer
- `no record` = Question not yet asked (for adaptive questions)

Rules MUST check `isUnknown` before inferring meaning from missing answers.

## Resume Capability

Session resumption uses `sessionId`:
1. Frontend stores `sessionId` from `startPlanner` response
2. On return, call `resumePlanner(sessionId)` or `startPlanner` with `sessionId`
3. Service loads all prior answers for that buyer/project/session
4. Returns current state with `completedQuestions`, `pendingQuestions`, `currentQuestion`
5. Buyer continues from where they left off

## Preview Generation

After mandatory questions complete (`mandatoryComplete: true`), `generatePreview()` creates:

```typescript
interface PlannerPreviewDto {
  householdSize: number;
  hasChildren: boolean;
  workFromHome: string;
  moveInMonths: number;
  topPriorities: string[];
  budgetTier: string;      // budget / mid / premium / luxury
  stylePreferences: string[];
  previewGenerated: boolean;
}
```

This preview is returned in the `preview` field of every response after Q6.

## API Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/projects/:projectId/adaptive-planner/questionnaire/:questionnaireId?` | Get questionnaire | BuyerSession |
| POST | `/projects/:projectId/adaptive-planner/start` | Start/resume session | BuyerSession |
| POST | `/projects/:projectId/adaptive-planner/answer` | Submit answer | BuyerSession |
| POST | `/projects/:projectId/adaptive-planner/resume/:sessionId` | Resume session | BuyerSession |
| POST | `/projects/:projectId/adaptive-planner/analytics` | Track analytics | BuyerSession |

### Response Format (PlannerResponseDto)
```json
{
  "state": {
    "sessionId": "cuid",
    "questionnaireId": "default-v1",
    "questionnaireVersion": "1.0",
    "answers": [...],
    "completedQuestions": ["household", "purpose", ...],
    "pendingQuestions": [...],
    "currentQuestion": "interior_budget",
    "progress": 50,
    "isComplete": false,
    "mandatoryComplete": false,
    "branchPath": "household=Couple > purpose=First Home > ...",
    "startedAt": "2026-07-07T...",
    "updatedAt": "2026-07-07T..."
  },
  "preview": { ... }  // Only present when mandatoryComplete=true
}
```

## Questionnaire Versioning

- `Questionnaire.version`: Semantic version (e.g., "1.0", "1.1", "2.0")
- `Question.versionAdded`: Version when question introduced
- `Question.versionDeprecated`: Version when question retired (optional)
- Developer-level default + Project-level overrides
- Migration path: Buyers on old version continue; new sessions use latest

## Integration with Decision Engine

On `planner.completed` event:
1. Service creates `DecisionSnapshot` with all answers
2. Calls `DecisionEngineService.evaluate(snapshot)`
3. Result stored as `DecisionEvaluation` linked to snapshot
4. Contains: facts, attributes, priorityScores, constraints, behaviourDimensions, explainability, conflicts

## Configuration

Environment variables:
- `PLANNER_DEFAULT_VERSION`: Default questionnaire version
- `PLANNER_MAX_QUESTIONS`: Hard limit (default 15)
- `PLANNER_MANDATORY_COUNT`: Mandatory questions count (default 6)

## Testing Checklist

- [ ] Mandatory flow (6 questions) completes successfully
- [ ] Branching triggers correctly for each adaptive question
- [ ] Resume returns correct state with all prior answers
- [ ] `isUnknown` flag works (skip vs false)
- [ ] Preview generated exactly after Q6
- [ ] Events emitted: started, answered, completed
- [ ] Analytics recorded with anonymousId
- [ ] Decision engine runs on completion