# API Contract - Cerex Platform

## Base URL
`/api/v1`

## Global Response Envelope
All successful responses:
```json
{
  "success": true,
  "message": "",
  "data": {},
  "meta": { "timestamp": "ISO8601", "requestId": "uuid" }
}
```
Error responses:
```json
{
  "success": false,
  "message": "Human readable error",
  "error": "ErrorCode",
  "statusCode": 400,
  "details": {}
}
```

## Authentication
- Bearer JWT in `Authorization` header.
- Project context via `X-Project-Id` or `X-Project-Slug` headers (set by middleware).

---

## Auth Module (`/auth`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/auth/login` | Email/password login | Public |
| POST | `/auth/register` | Register developer | Public |
| POST | `/auth/refresh` | Refresh access token | Public |
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password` | Reset password with token | Public |
| GET | `/auth/me` | Current user profile | JWT |
| POST | `/auth/logout` | Logout (revoke refresh) | JWT |

---

## Developers Module (`/developers`) - SuperAdmin only

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/developers` | Create developer | JWT + Roles(super-admin) |
| GET | `/developers` | List developers | JWT + Roles(admin, super-admin) |
| GET | `/developers/:id` | Get developer | JWT + Roles(admin, super-admin) |
| PUT | `/developers/:id` | Update developer | JWT + Roles(admin, super-admin) |
| DELETE | `/developers/:id` | Delete developer | JWT + Roles(super-admin) |
| PUT | `/developers/:id/status` | Toggle active | JWT + Roles(super-admin) |

---

## Projects Module (`/projects`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/projects` | Create project | JWT |
| GET | `/projects` | List my projects | JWT |
| GET | `/projects/:id` | Get project | JWT + ProjectAccess |
| GET | `/projects/slug/:slug` | Get project by slug | JWT + ProjectAccess |
| PUT | `/projects/:id` | Update project | JWT + ProjectAccess |
| DELETE | `/projects/:id` | Delete project | JWT + ProjectAccess |
| POST | `/projects/:id/publish` | Publish project | JWT + ProjectAccess |
| POST | `/projects/:id/unpublish` | Unpublish project | JWT + ProjectAccess |

---

## Project Config Module (`/projects/:projectId/config`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Get config | JWT + ProjectAccess |
| PUT | `/` | Update config | JWT + ProjectAccess |

---

## Buyers Module (`/projects/:projectId/buyers`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/` | Create buyer | JWT + ProjectAccess |
| GET | `/` | List buyers | JWT + ProjectAccess |
| GET | `/:id` | Get buyer | JWT + ProjectAccess |
| GET | `/email/:email` | Get buyer by email | JWT + ProjectAccess |
| PUT | `/:id` | Update buyer | JWT + ProjectAccess |
| DELETE | `/:id` | Delete buyer | JWT + ProjectAccess |

---

## Planner Module (`/projects/:projectId/planner`) - Legacy

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/answers` | Submit answers + get recommendation | JWT + ProjectAccess |
| GET | `/layouts` | List available layouts | JWT + ProjectAccess |
| POST | `/recommendation` | Get recommendation only | JWT + ProjectAccess |

---

## Adaptive Planner Module (`/projects/:projectId/adaptive-planner`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/questionnaire/:questionnaireId?` | Get questionnaire definition | BuyerSession |
| POST | `/start` | Start or resume planner session | BuyerSession |
| POST | `/answer` | Submit answer, get next question + preview | BuyerSession |
| POST | `/resume/:sessionId` | Resume planner session | BuyerSession |
| POST | `/analytics` | Track planner analytics event | BuyerSession |

### GET `/projects/:projectId/adaptive-planner/questionnaire/:questionnaireId?`

**Headers**
```
Authorization: Bearer <buyer-session-access-token>
X-Project-Id: <project-id>   (or X-Project-Slug)
```

**Response 200**
```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "default-v1",
    "name": "Default Questionnaire v1",
    "description": "Standard adaptive questionnaire for home buyers",
    "version": "1.0",
    "mandatoryCount": 6,
    "maxQuestions": 15,
    "avgCompletionSecs": 75,
    "questions": [
      {
        "key": "household",
        "label": "Who will live here?",
        "type": "single",
        "category": "household",
        "isMandatory": true,
        "order": 1,
        "options": [
          { "value": "Just Me", "label": "Just Me", "key": "single" },
          { "value": "Couple", "label": "Couple", "key": "couple" },
          { "value": "Couple + Child", "label": "Couple + Child", "key": "couple_child" },
          { "value": "Family", "label": "Family", "key": "family" },
          { "value": "Joint Family", "label": "Joint Family", "key": "joint_family" },
          { "value": "Buying as Investment", "label": "Buying as Investment", "key": "investment" }
        ],
        "branchKey": "household"
      },
      ...
    ]
  },
  "meta": { "timestamp": "2026-07-07T...", "requestId": "uuid" }
}
```

### POST `/projects/:projectId/adaptive-planner/start`

**Headers**
```
Authorization: Bearer <buyer-session-access-token>
X-Project-Id: <project-id>
Content-Type: application/json
```

**Request Body**
```json
{
  "questionnaireId": "default-v1"
}
```

**Response 200**
```json
{
  "success": true,
  "message": "",
  "data": {
    "state": {
      "sessionId": "cuid...",
      "questionnaireId": "default-v1",
      "questionnaireVersion": "1.0",
      "answers": [],
      "completedQuestions": [],
      "pendingQuestions": ["household", "purpose", "priorities", "interior_budget", "interior_style", "move_in_timeline"],
      "currentQuestion": "household",
      "progress": 0,
      "isComplete": false,
      "mandatoryComplete": false,
      "branchPath": "",
      "startedAt": "2026-07-07T...",
      "updatedAt": "2026-07-07T..."
    },
    "preview": null
  },
  "meta": { "timestamp": "2026-07-07T...", "requestId": "uuid" }
}
```

### POST `/projects/:projectId/adaptive-planner/answer`

**Headers**
```
Authorization: Bearer <buyer-session-access-token>
X-Project-Id: <project-id>
Content-Type: application/json
```

**Request Body**
```json
{
  "questionKey": "household",
  "value": "Couple",
  "valueType": "string",
  "isUnknown": false,
  "timeSpentMs": 5000
}
```

**Response 200**
```json
{
  "success": true,
  "message": "",
  "data": {
    "state": {
      "sessionId": "cuid...",
      "questionnaireId": "default-v1",
      "questionnaireVersion": "1.0",
      "answers": [
        { "questionKey": "household", "value": "Couple", "valueType": "string", "isUnknown": false, "timeSpentMs": 5000 }
      ],
      "completedQuestions": ["household"],
      "pendingQuestions": ["purpose", "priorities", "interior_budget", "interior_style", "move_in_timeline"],
      "currentQuestion": "purpose",
      "progress": 16,
      "isComplete": false,
      "mandatoryComplete": false,
      "branchPath": "household=\"Couple\"",
      "startedAt": "2026-07-07T...",
      "updatedAt": "2026-07-07T..."
    },
    "preview": null
  },
  "meta": { "timestamp": "2026-07-07T...", "requestId": "uuid" }
}
```

**After Q6 (mandatory complete) - Response includes preview:**
```json
{
  "success": true,
  "data": {
    "state": { ... "mandatoryComplete": true, "currentQuestion": "children_ages" ... },
    "preview": {
      "householdSize": 2,
      "hasChildren": false,
      "workFromHome": "sometimes",
      "moveInMonths": 9,
      "topPriorities": ["storage", "office"],
      "budgetTier": "mid",
      "stylePreferences": ["modern", "luxury"],
      "previewGenerated": true
    }
  }
}
```

### POST `/projects/:projectId/adaptive-planner/resume/:sessionId`

**Response 200** - Same format as `/start` with existing answers loaded

### POST `/projects/:projectId/adaptive-planner/analytics`

**Request Body**
```json
{
  "eventType": "answered",
  "questionKey": "household",
  "value": "Couple",
  "timeSpentMs": 5000,
  "anonymousId": "anon_abc123"
}
```

---

## Questionnaire Admin Module (`/admin/questionnaires`) - SuperAdmin

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/` | Create new questionnaire | JWT |
| GET | `/` | List all questionnaires | JWT |
| GET | `/:id` | Get questionnaire by ID | JWT |
| PUT | `/:id` | Update questionnaire | JWT |

---

## Planner Intelligence Module (`/projects/:projectId/planner`) - Legacy

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/normalize` | Normalize raw planner answers | BuyerSession + ProjectAccess |

### POST `/projects/:projectId/planner/normalize`

**Headers**
```
Authorization: Bearer <buyer-session-access-token>
X-Project-Id: <project-id>
Content-Type: application/json
```

**Request Body**
```json
{
  "answers": {
    "familySize": "4",
    "children": "1",
    "workFromHome": "Full-time",
    "lifestyle": "Balanced",
    "timeline": "1 year",
    "style": "Modern Luxury",
    "budget": 2.5
  },
  "projectId": "optional-if-in-header",
  "buyerId": "optional-if-in-session",
  "sessionId": "optional"
}
```

**Response 200**
```json
{
  "success": true,
  "message": "",
  "data": {
    "household": { "adults": 2, "children": 1, "total": 3, "hasChildren": true, "childrenAgeRanges": [] },
    "lifestyle": { "primary": "balanced", "workFromHome": "full-time", "moveInMonths": 12, "prefersQuiet": false },
    "design": { "style": ["modern", "luxury"], "explicit": true, "colorPalette": "neutral-gold" },
    "financial": { "budgetMinorUnits": 25000000, "currency": "INR", "explicit": true },
    "preferences": { "prefersBalcony": true, "needsHomeOffice": true, "preferredFloorLevel": "mid" },
    "rawAnswers": { "familySize": "4", "children": "1", "workFromHome": "Full-time", "lifestyle": "Balanced", "timeline": "1 year", "style": "Modern Luxury", "budget": 2.5 },
    "version": 1,
    "normalizedAt": "2026-07-04T12:34:56.789Z"
  },
  "meta": { "timestamp": "2026-07-04T12:34:56.789Z", "requestId": "uuid" }
}
```

---

## Buyer Session Module (`/projects/:projectId/buyer/session`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/` | Create anonymous buyer session | JWT + ProjectAccess |
| POST | `/refresh` | Refresh access token | JWT + ProjectAccess |
| GET | `/me` | Get current buyer profile | BuyerSession |

---

## Decision Engine Module (`/decision-engine`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/evaluate` | Evaluate decision engine for buyer snapshot | BuyerSession + ProjectAccess |

### POST `/decision-engine/evaluate`

**Headers**
```
Authorization: Bearer <buyer-session-access-token>
X-Project-Id: <project-id>
Content-Type: application/json
```

**Request Body**
```json
{
  "snapshot": {
    "buyerId": "cuid...",
    "projectId": "cuid...",
    "sessionId": "cuid...",
    "answers": {
      "household": "Couple",
      "purpose": "First Home",
      "priorities": ["storage", "office"],
      "interior_budget": 800000,
      "interior_style": "Modern Luxury",
      "move_in_timeline": "6-12 Months"
    }
  }
}
```

**Response 200**
```json
{
  "success": true,
  "message": "",
  "data": {
    "facts": [
      { "key": "householdSize", "value": 2, "type": "number", "source": "planner.answers.household", "confidence": 1.0 },
      { "key": "childrenCount", "value": 0, "type": "number", "source": "planner.answers.household", "confidence": 1.0 },
      { "key": "workFromHome", "value": "sometimes", "type": "string", "source": "planner.answers.work_from_home", "confidence": 1.0 },
      ...
    ],
    "attributes": {
      "household": [
        { "key": "householdSize", "value": 2, "type": "number", "confidence": 1.0, "reasoning": "Total 2 members" },
        { "key": "childrenPresent", "value": false, "type": "boolean", "confidence": 1.0, "reasoning": "No children" }
      ],
      "lifestyle": [
        { "key": "remoteWorkIntensity", "value": "low", "type": "string", "confidence": 0.9, "reasoning": "Work from home: sometimes" },
        { "key": "moveInUrgency", "value": "medium", "type": "string", "confidence": 0.8, "reasoning": "9 months" }
      ],
      "financial": [
        { "key": "interiorBudgetTier", "value": "mid", "type": "string", "confidence": 0.9, "reasoning": "₹8L budget" }
      ],
      "design": [
        { "key": "preferredStyles", "value": ["modern", "luxury"], "type": "array", "confidence": 0.9, "reasoning": "Styles: modern, luxury" },
        { "key": "materialPreference", "value": "engineered-composites", "type": "string", "confidence": 0.7, "reasoning": "Inferred from styles" }
      ],
      "usage": [
        { "key": "officeRequirement", "value": true, "type": "boolean", "confidence": 0.9, "reasoning": "WFH requires office" }
      ],
      "safety": [
        { "key": "childSafetyRequired", "value": false, "type": "boolean", "confidence": 0.95, "reasoning": "No children" }
      ]
    },
    "priorityScores": {
      "office": { "score": 60, "weight": 1.0, "confidence": 0.9, "reasoning": "Office priority based on household composition and lifestyle factors" },
      "kitchen": { "score": 60, "weight": 0.9, "confidence": 0.8, "reasoning": "..." },
      "storage": { "score": 50, "weight": 0.85, "confidence": 0.75, "reasoning": "..." },
      "dining": { "score": 50, "weight": 0.8, "confidence": 0.8, "reasoning": "..." },
      "livingRoom": { "score": 70, "weight": 0.75, "confidence": 0.8, "reasoning": "..." },
      "balcony": { "score": 50, "weight": 0.7, "confidence": 0.8, "reasoning": "..." },
      "utility": { "score": 60, "weight": 0.65, "confidence": 0.6, "reasoning": "..." },
      "safety": { "score": 20, "weight": 1.0, "confidence": 0.9, "reasoning": "..." },
      "accessibility": { "score": 40, "weight": 0.9, "confidence": 0.9, "reasoning": "..." }
    },
    "constraints": [
      { "id": "DedicatedOffice", "name": "Dedicated Office", "confidence": 0.7, "sourceRules": ["RULE_HYBRID_WORK"], "reason": "Dedicated Office required because buyer works from home" }
    ],
    "behaviourDimensions": {
      "privacyOrientation": { "score": 50, "confidence": 0.72, "source": "facts + rules", "reasoning": "Privacy Orientation: based on prefersQuiet, primaryLifestyle, householdSize, hostingFrequency", "triggeringRules": [], "contributingFacts": ["prefersQuiet", "primaryLifestyle", "householdSize", "hostingFrequency"] },
      "hostingOrientation": { "score": 50, "confidence": 0.72, "source": "facts + rules", "reasoning": "Hosting Orientation: based on primaryLifestyle, hostingFrequency, guestFrequency, householdSize", ... },
      "luxuryOrientation": { "score": 65, "confidence": 0.75, "source": "facts + rules", ... },
      "comfortOrientation": { "score": 68, "confidence": 0.75, "source": "facts + rules", ... },
      "maintenanceOrientation": { "score": 68, "confidence": 0.75, "source": "facts + rules", ... },
      "futurePlanning": { "score": 65, "confidence": 0.72, "source": "facts + rules", ... },
      "wellnessOrientation": { "score": 65, "confidence": 0.72, "source": "facts + rules", ... },
      "technologyAffinity": { "score": 58, "confidence": 0.72, "source": "facts + rules", ... },
      "familyOrientation": { "score": 68, "confidence": 0.75, "source": "facts + rules", ... }
    },
    "explainability": {
      "facts": { "householdSize": { "source": "planner.answers.household", "confidence": 1.0, "triggeringRules": [], "reasoning": "Direct from planner answer: household=Couple" }, ... },
      "attributes": { "remoteWorkIntensity": { "source": "derived", "confidence": 0.9, "triggeringRules": [], "reasoning": "Inferred from workFromHome=sometimes" }, ... },
      "priorities": { "office": { "source": "RULE_HYBRID_WORK", "confidence": 0.8, "triggeringRules": ["RULE_HYBRID_WORK"], "reasoning": "Applied RULE_HYBRID_WORK (severity: normal, priority: 8)" } },
      "constraints": { "DedicatedOffice": { "source": "RULE_HYBRID_WORK", "confidence": 0.7, "triggeringRules": ["RULE_HYBRID_WORK"], "reasoning": "Applied RULE_HYBRID_WORK (severity: normal, priority: 8)" } },
      "behaviours": { "privacyOrientation": { "source": "facts + rules", "confidence": 0.72, "triggeringRules": [], "contributingFacts": ["prefersQuiet", "primaryLifestyle", "householdSize", "hostingFrequency"], "reasoning": "Privacy Orientation: based on prefersQuiet, primaryLifestyle, householdSize, hostingFrequency" } },
      "conflicts": []
    },
    "conflicts": [],
    "metadata": {
      "evaluatedAt": "2026-07-07T10:30:00.000Z",
      "snapshotId": "cuid...",
      "ruleVersion": "1.0",
      "evaluationId": "cuid..."
    }
  },
  "meta": { "timestamp": "2026-07-07T10:30:00.000Z", "requestId": "uuid" }
}
```

---

## Events Module (`/projects/:projectId/events`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/` | Record event | JWT + ProjectAccess |
| GET | `/` | List events (paginated) | JWT + ProjectAccess |

**Event Names (immutable)**
- `landing_viewed`
- `planner_started`
- `planner_answered`
- `planner_completed`
- `room_viewed`
- `layout_saved`
- `summary_viewed`
- `site_visit_requested`

---

## Summary Module (`/projects/:projectId/summary`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | Get buyer summary | BuyerSession |

---

## Viewer Module (`/projects/:projectId/viewer`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/models` | List 3D models | JWT + ProjectAccess |
| GET | `/models/:modelId` | Get model metadata | JWT + ProjectAccess |

---

## Leads Module (`/projects/:projectId/leads`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/` | Create lead (site visit) | JWT + ProjectAccess |
| GET | `/` | List leads | JWT + ProjectAccess |
| GET | `/:id` | Get lead | JWT + ProjectAccess |
| PUT | `/:id` | Update lead | JWT + ProjectAccess |
| DELETE | `/:id` | Delete lead | JWT + ProjectAccess |

---

## Storage Module (`/projects/:projectId/storage`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/upload` | Get signed upload URL | JWT + ProjectAccess |
| GET | `/` | List stored objects | JWT + ProjectAccess |

---

## Dashboard Module (`/projects/:projectId/dashboard`)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/overview` | Dashboard overview | JWT + ProjectAccess |
| GET | `/funnel` | Conversion funnel | JWT + ProjectAccess |

---

## Health Checks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Full health (DB + Redis) |
| GET | `/health/live` | Liveness probe |
| GET | `/health/ready` | Readiness probe |

---

## Swagger
Available at `/docs` (configurable via `SWAGGER_PATH`).