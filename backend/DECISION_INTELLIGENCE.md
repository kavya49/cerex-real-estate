# Decision Intelligence

## Overview
The Decision Intelligence platform transforms normalized planner answers into structured decision intelligence. It is the single source of truth for all future recommendation logic (apartment matching, furniture suggestions, AI assistant, CRM insights).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DecisionEngineService                      │
│                         (Orchestrator)                            │
└─────────────────────────────────────────────────────────────────┘
         │                │                │                │
         ▼                ▼                ▼                ▼
┌───────────────┐ ┌───────────────┐ ┌────────────────┐ ┌────────────────┐
│  FactBuilder  │ │  RuleEngine   │ │ AttributeBuilder│ │ PriorityEngine │
│  (35+ facts)  │ │  (23+ rules)  │ │  (25+ attrs)   │ │ (13 priorities)│
└───────────────┘ └───────────────┘ └────────────────┘ └────────────────┘
         │                │                │                │
         └────────────────┴────────────────┴────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ConstraintEngine                              │
│                    (9 constraint types)                          │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              BehaviourDimensions (9 dimensions)                  │
│              Explainability (full traceability)                  │
│              ConflictResolution (deterministic)                  │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### 1. FactBuilderService
Converts raw planner answers into **objective, immutable facts**.

**Output**: `FactDto[]` - 35+ facts across categories:
- **Household**: householdSize, childrenCount, adultCount, seniorCount, petCount
- **Work**: workFromHome, remoteWorkDays
- **Timeline**: moveInMonths
- **Financial**: budget {currency, amountMinorUnits}, budgetTier, interiorBudgetTier
- **Preferences**: stylePreferences, preferredStyles, purchasePurpose, primaryLifestyle, prefersQuiet, prefersBalcony, needsHomeOffice
- **Frequencies**: guestFrequency, cookingFrequency, readingFrequency, fitnessFrequency, hostingFrequency
- **Needs**: storageNeed, laundryNeed, officeNeed

Each fact includes: `key`, `value`, `type`, `source`, `confidence (0-1)`

### 2. RuleEngineService
Configuration-driven rule evaluation with **23+ rules** across 7 categories.

**Rule Structure**:
```typescript
interface Rule {
  id: string;
  name: string;
  version: number;
  enabled: boolean;
  priority: number;      // Execution order (higher = earlier)
  severity: "critical" | "high" | "normal" | "low";
  category: "household" | "lifestyle" | "financial" | "design" | "safety" | "investment" | "behaviour";
  description: string;
  conditions: RuleCondition[];
  effects: RuleEffect[];
  overrides?: RuleOverride[];
}
```

**Effect Types**:
- `attribute`: Sets/updates an attribute
- `priority`: Adjusts priority score (with weight)
- `constraint`: Adds/removes constraint
- `behaviour`: Sets behaviour dimension score

**Execution**:
1. All rules evaluated against facts
2. Matching rules fire effects
3. Effects sorted by severity → priority → confidence
4. Conflicts resolved (see Conflict Resolution)
5. RuleExecutionLog recorded per rule

### 3. AttributeBuilderService
Generates **25+ derived attributes** from facts + rule results.

**Categories**:
- **Household** (5): largeFamily, childrenPresent, childrenCount, seniorsPresent, petsPresent
- **Lifestyle** (6): remoteWorkIntensity, entertainmentIntensity, cookingIntensity, readingInterest, fitnessInterest, moveInUrgency, prefersQuiet
- **Financial** (4): interiorBudgetTier, purchaseUrgency, financingSensitivity, budgetExplicit
- **Design** (6): preferredStyles, materialPreference, lightingPreference, opennessPreference, colorPalette, prefersBalcony
- **Usage** (4): officeRequirement, storageRequirement, diningRequirement, utilityRequirement
- **Safety** (3): childSafetyRequired, seniorAccessibilityRequired, petSafetyRequired

Each attribute: `key`, `value`, `type`, `confidence`, `reasoning`, `triggeringRules`

### 4. PriorityEngineService
Calculates **13 priority scores** (0-100) with weights.

| Category | Weight | Typical Range |
|----------|--------|---------------|
| office | 1.0 | 20-95 |
| kitchen | 0.9 | 40-90 |
| storage | 0.85 | 50-95 |
| dining | 0.8 | 50-92 |
| livingRoom | 0.75 | 60-95 |
| balcony | 0.7 | 50-85 |
| utility | 0.65 | 60-70 |
| safety | 1.0 | 20-100 |
| accessibility | 0.9 | 40-85 |
| entertainment | 0.7 | - |
| lighting | 0.8 | - |
| privacy | 0.8 | - |
| bedroom | 0.85 | - |

Scores include: `score`, `weight`, `confidence`, `reasoning`, `triggeringRules`

### 5. ConstraintEngineService
Generates **9 mandatory constraints** that recommendation engine MUST satisfy.

| Constraint | Type | Source Rules | Confidence |
|------------|------|--------------|------------|
| DedicatedOffice | spatial | RULE_REMOTE_WORK, RULE_HYBRID_WORK, RULE_WFH_OFFICE_PRIORITY | 0.95 |
| LargeDining | spatial | RULE_LARGE_FAMILY_DINING | 0.9 |
| HighStorage | storage | RULE_LARGE_FAMILY_STORAGE | 0.95 |
| ChildSafeLayout | safety | RULE_CHILD_SAFETY | 0.95 |
| PetFriendlyFlooring | safety | RULE_PET_SAFETY | 0.8 |
| SeniorAccessibleBathroom | accessibility | RULE_SENIOR_ACCESSIBILITY | 0.9 |
| NoGlassFurniture | safety | RULE_CHILD_SAFETY | 0.85 |
| LowMaintenanceMaterials | maintenance | RULE_BUDGET_BUDGET, RULE_LARGE_FAMILY_STORAGE | 0.8 |
| NaturalLightingRequired | environmental | RULE_WELLNESS_FOCUSED, RULE_QUIET_WORKSPACE | 0.85 |

Each constraint: `id`, `name`, `confidence`, `sourceRules[]`, `reason`

### 6. Behaviour Dimensions (9)
Intermediate outputs for CRM, marketing, sales intelligence.

| Dimension | Key | Range | Factors |
|-----------|-----|-------|---------|
| Privacy Orientation | privacyOrientation | 0-100 | prefersQuiet, primaryLifestyle, householdSize, hostingFrequency |
| Hosting Orientation | hostingOrientation | 0-100 | primaryLifestyle, hostingFrequency, guestFrequency, householdSize |
| Luxury Orientation | luxuryOrientation | 0-100 | interiorBudgetTier, preferredStyles, materialPreference |
| Comfort Orientation | comfortOrientation | 0-100 | preferredStyles, materialPreference, lightingPreference, primaryLifestyle |
| Maintenance Orientation | maintenanceOrientation | 0-100 | interiorBudgetTier, householdSize, childrenCount, petCount, preferredStyles |
| Future Planning | futurePlanning | 0-100 | purchasePurpose, moveInMonths, householdSize, interiorBudgetTier |
| Wellness Orientation | wellnessOrientation | 0-100 | primaryLifestyle, prefersBalcony, preferredFloorLevel, lightingPreference |
| Technology Affinity | technologyAffinity | 0-100 | workFromHome, needsHomeOffice, interiorBudgetTier |
| Family Orientation | familyOrientation | 0-100 | childrenCount, householdSize, purchasePurpose, preferredStyles |

Each: `score`, `confidence`, `source`, `reasoning`, `triggeringRules`, `contributingFacts`

## Rule Registry (23 Rules)

### Household (6)
1. RULE_REMOTE_WORK - Full remote → dedicated office
2. RULE_HYBRID_WORK - Hybrid → flexible office
3. RULE_WFH_OFFICE_PRIORITY - WFH → office priority
4. RULE_LARGE_FAMILY_STORAGE - 2+ children → high storage
5. RULE_LARGE_FAMILY_DINING - 5+ household → large dining
6. RULE_FAMILY_ORIENTATION - Children → family orientation

### Safety (3)
7. RULE_CHILD_SAFETY - Children → child safety (critical)
8. RULE_SENIOR_ACCESSIBILITY - Seniors → accessibility (high)
9. RULE_PET_SAFETY - Pets → pet-friendly materials

### Financial (5)
10. RULE_BUDGET_PREMIUM - Luxury budget → premium finishes
11. RULE_BUDGET_MID - Mid budget → balance quality/cost
12. RULE_BUDGET_BUDGET - Budget → financing sensitive
13. RULE_MOVE_IN_URGENT - <3 months → bedroom/bathroom priority
14. RULE_MOVE_IN_EXPLORING - >12 months → low urgency

### Design (4)
15. RULE_STYLE_LUXURY - Luxury style → premium materials
16. RULE_STYLE_MINIMALIST - Minimalist → light wood, low maintenance
17. RULE_STYLE_SCANDINAVIAN - Scandinavian → light wood, natural light
18. RULE_STYLE_WARM - Warm style → family orientation, comfort

### Lifestyle (3)
19. RULE_LIFESTYLE_WELLNESS - Wellness → balcony, lighting
20. RULE_LIFESTYLE_QUIET - Quiet → privacy
21. RULE_LIFESTYLE_SOCIAL - Social → hosting spaces

### Behaviour (2)
22. RULE_INVESTMENT_ORIENTATION - Investment → future planning
23. RULE_FIRST_HOME - First home → future planning, family orientation

## Data Models

### DecisionSnapshot
```prisma
model DecisionSnapshot {
  id                    String   @id @default(cuid())
  buyerId               String
  projectId             String
  sessionId             String?
  plannerVersion        String   @default("1.0")
  questionnaireVersion  String   @default("1.0")
  normalizationVersion  String   @default("1.0")
  decisionEngineVersion String   @default("1.0")
  generatedAt           DateTime @default(now())
  facts                 Json
  attributes            Json
  priorityScores        Json
  constraints           Json
  metadata              Json?
  ruleExecutionLog      Json?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  buyer       Buyer               @relation(fields: [buyerId], references: [id], onDelete: Cascade)
  project     Project             @relation(fields: [projectId], references: [id], onDelete: Cascade)
  evaluations DecisionEvaluation[]
  behaviourDimensions BehaviourDimension[]
}
```

### DecisionEvaluation
```prisma
model DecisionEvaluation {
  id             String   @id @default(cuid())
  snapshotId     String
  facts          Json
  attributes     Json
  priorityScores Json
  constraints    Json
  evaluatedAt    DateTime @default(now())
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  snapshot       DecisionSnapshot @relation(fields: [snapshotId], references: [id], onDelete: Cascade)
  explanations   DecisionExplanation[]
}
```

### BehaviourDimension
```prisma
model BehaviourDimension {
  id              String   @id @default(cuid())
  snapshotId      String
  dimension       String   // privacy, hosting, luxury, comfort, maintenance, futurePlanning, wellness, technology, family
  score           Float    // 0-100
  confidence      Float    // 0-1
  sourceFacts     String[] // fact keys that contributed
  triggeringRules String[] // rule IDs that contributed
  reasoning       String
  createdAt       DateTime @default(now())

  snapshot        DecisionSnapshot @relation(fields: [snapshotId], references: [id], onDelete: Cascade)

  @@index([snapshotId])
  @@index([dimension])
  @@unique([snapshotId, dimension])
}
```

### DecisionExplanation
```prisma
model DecisionExplanation {
  id                String   @id @default(cuid())
  evaluationId      String
  outputType        String   // fact, attribute, priority, constraint, behaviour
  outputKey         String
  source            String   // planner.answers.x, derived, RULE_X, default
  confidence        Float
  reasoning         String
  triggeringRules   String[]
  contributingFacts String[]
  createdAt         DateTime @default(now())

  evaluation        DecisionEvaluation @relation(fields: [evaluationId], references: [id], onDelete: Cascade)

  @@index([evaluationId])
  @@index([outputType])
  @@index([outputKey])
}
```

## API

### Evaluate Decision Engine
```
POST /api/v1/decision-engine/evaluate
```

**Request**:
```json
{
  "snapshot": {
    "buyerId": "cuid",
    "projectId": "cuid",
    "sessionId": "cuid",
    "answers": { "household": "Couple", "purpose": "First Home", ... }
  }
}
```

**Response**:
```json
{
  "facts": [...],
  "attributes": { "household": [...], "lifestyle": [...], ... },
  "priorityScores": { "office": { "score": 85, "confidence": 0.9, ... }, ... },
  "constraints": [{ "id": "DedicatedOffice", "confidence": 0.95, "sourceRules": [...], "reason": "..." }],
  "behaviourDimensions": { "privacyOrientation": { "score": 50, "confidence": 0.7, ... }, ... },
  "explainability": { "facts": {...}, "attributes": {...}, "priorities": {...}, "constraints": {...}, "behaviours": {...}, "conflicts": [...] },
  "conflicts": [{ "key": "requiresOffice", "winnerRuleId": "RULE_REMOTE_WORK", "loserRuleId": "RULE_HYBRID_WORK", ... }],
  "metadata": { "evaluatedAt": "...", "snapshotId": "...", "ruleVersion": "1.0", "evaluationId": "..." }
}
```

## Versioning

- `plannerVersion`: Questionnaire version
- `questionnaireVersion`: Questionnaire schema version
- `normalizationVersion`: Normalization logic version
- `decisionEngineVersion`: Decision engine logic version
- `Rule.version`: Individual rule version
- `RuleRegistry` version: Aggregate version for rule set

Breaking changes require new IDs, not version bumps.

## Scalability Targets

| Metric | Target |
|--------|--------|
| Rules supported | 300+ |
| Evaluation latency | <50ms |
| Concurrent evaluations | 1000+ |
| Fact count | 100+ |
| Attribute count | 50+ |
| Priority categories | 20+ |
| Constraint types | 20+ |
| Behaviour dimensions | 15+ |