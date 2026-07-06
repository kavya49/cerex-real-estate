# Questionnaire Schema

## Database Models

### Questionnaire
```prisma
model Questionnaire {
  id                String   @id @default(cuid())
  developerId       String?
  projectId         String?
  version           String   @default("1.0")
  name              String
  description       String?
  isActive          Boolean  @default(true)
  isDefault         Boolean  @default(false)
  mandatoryCount    Int      @default(6)
  maxQuestions      Int      @default(15)
  avgCompletionSecs Int      @default(75)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  developer   Developer?     @relation(fields: [developerId], references: [id], onDelete: SetNull)
  project     Project?       @relation(fields: [projectId], references: [id], onDelete: SetNull)
  questions   Question[]
  plannerAnswers PlannerAnswer[]
  plannerAnalytics PlannerAnalytics[]

  @@index([developerId])
  @@index([projectId])
  @@index([isActive])
  @@unique([developerId, projectId, version])
}
```

### Question
```prisma
model Question {
  id                String   @id @default(cuid())
  questionnaireId   String
  key               String
  label             String
  type              String   // single, multi, slider, scale
  category          String   // household, lifestyle, design, financial, investment, behaviour
  isMandatory       Boolean  @default(false)
  order             Int
  versionAdded      String   @default("1.0")
  versionDeprecated String?
  options           Json?    // For single/multi: [{value, label, key}]
  minValue          Int?     // For slider
  maxValue          Int?     // For slider
  step              Int?     // For slider
  unit              String?  // For slider (e.g., "L")
  dependsOn         Json?    // Branching: { questionKey, operator, value }
  branchKey         String?  // Category for grouping
  metadata          Json?    // Additional config (e.g., maxSelections)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  questionnaire       Questionnaire  @relation(fields: [questionnaireId], references: [id], onDelete: Cascade)
  nextQuestions       Branch[]       @relation("NextQuestions")
  previousQuestions   Branch[]       @relation("PreviousQuestions")

  @@index([questionnaireId])
  @@index([key])
  @@index([category])
  @@index([isMandatory])
}
```

### Branch
```prisma
model Branch {
  id                String   @id @default(cuid())
  fromQuestionId    String
  toQuestionId      String
  condition         Json     // { operator: "eq|in|gt|...", value: any }
  branchType        String   // mandatory, adaptive, optional
  priority          Int      @default(0)
  createdAt         DateTime @default(now())

  fromQuestion      Question @relation("NextQuestions", fields: [fromQuestionId], references: [id], onDelete: Cascade)
  toQuestion        Question @relation("PreviousQuestions", fields: [toQuestionId], references: [id], onDelete: Cascade)

  @@index([fromQuestionId])
  @@index([toQuestionId])
}
```

## Default Questionnaire (default-v1)

See `ADAPTIVE_PLANNER.md` for the complete question list.

## Developer-Specific Questionnaires

Developers can create custom questionnaires:
- Scoped to `developerId` (available to all their projects)
- Or scoped to `projectId` (single project override)
- Version controlled via `version` field
- `isDefault` flag marks the default for a developer/project

## Project-Specific Overrides

Projects can override:
- Entire questionnaire (new Questionnaire with projectId)
- Individual questions (Question with projectId via Questionnaire)
- Feature flags in ProjectConfig (`enablePlanner`, etc.)

## Questionnaire Resolution Order

1. Project-specific Questionnaire (projectId + isDefault)
2. Developer-level default Questionnaire (developerId + isDefault, no projectId)
3. Platform default (default-v1)

## Version Compatibility

| Scenario | Behavior |
|----------|----------|
| New question added (v1.1) | Existing buyers continue on v1.0; new sessions use v1.1 |
| Question deprecated | Not shown in new sessions; existing answers preserved |
| Question modified | Treated as new version; old version preserved for existing buyers |
| Breaking change | New questionnaire with new ID; migration script for existing data |

## DTO Definitions

### QuestionnaireDto
```typescript
interface QuestionnaireDto {
  id: string;
  name: string;
  description?: string;
  version: string;
  mandatoryCount: number;
  maxQuestions: number;
  avgCompletionSecs: number;
  questions: QuestionnaireQuestionDto[];
}
```

### QuestionnaireQuestionDto
```typescript
interface QuestionnaireQuestionDto {
  key: string;
  label: string;
  type: "single" | "multi" | "slider" | "scale";
  category: string;
  isMandatory: boolean;
  order: number;
  options?: QuestionnaireOptionDto[];
  minValue?: number;
  maxValue?: number;
  step?: number;
  unit?: string;
  dependsOn?: {
    questionKey: string;
    operator: "eq" | "neq" | "in" | "contains" | "gt" | "gte" | "lt" | "lte";
    value: any;
  };
  branchKey?: string;
  metadata?: Record<string, any>;
}
```

## Migration Strategy

For existing projects on the old 7-question planner:
1. Create default-v1 questionnaire in DB
2. Map old planner answers to new question keys
3. Backfill PlannerAnswer records
4. Update frontend to use new endpoints

## Validation Rules

- `mandatoryCount` ≤ `maxQuestions` ≤ 15
- All mandatory questions must have `order` 1..mandatoryCount
- No circular branches
- `dependsOn` question must exist and have lower `order`
- `type` must match `options`/`minValue`/`maxValue` presence