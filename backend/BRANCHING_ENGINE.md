# Branching Engine

## Overview
The Branching Engine evaluates `dependsOn` conditions to determine which adaptive questions to show. It runs after every answer submission to dynamically calculate the next question.

## Branching Logic

### Condition Structure
```typescript
interface BranchCondition {
  questionKey: string;    // The question to evaluate
  operator: "eq" | "neq" | "in" | "contains" | "gt" | "gte" | "lt" | "lte";
  value: any;             // Expected value(s)
}
```

### Operators

| Operator | Description | Works With |
|----------|-------------|------------|
| `eq` | Exact equality | string, number, boolean |
| `neq` | Not equal | string, number, boolean |
| `in` | Value in array | string, number |
| `contains` | Array contains value | array (multi-select answers) |
| `gt` | Greater than | number |
| `gte` | Greater than or equal | number |
| `lt` | Less than | number |
| `lte` | Less than or equal | number |

### Evaluation Algorithm

```typescript
function shouldAskQuestion(question, answeredMap):
  if no dependsOn: return true
  
  const { questionKey, operator, value } = question.dependsOn
  const answer = answeredMap.get(questionKey)?.value
  
  if answer is undefined: return false  // Prerequisite not answered
  
  switch operator:
    case "eq":    return answer === value
    case "neq":   return answer !== value
    case "in":    return Array.isArray(value) && value.includes(answer)
    case "contains": return Array.isArray(answer) && answer.includes(value)
    case "gt":    return Number(answer) > Number(value)
    case "gte":   return Number(answer) >= Number(value)
    case "lt":    return Number(answer) < Number(value)
    case "lte":   return Number(answer) <= Number(value)
    default: return true
```

### Question Flow

```
START
  │
  ▼
┌─────────────────────────────────────┐
│  Mandatory Questions (1-6)          │
│  Asked in order, no branching       │
└─────────────────────────────────────┘
  │
  ▼ (after Q6 complete)
┌─────────────────────────────────────┐
│  Preview Generated                  │
│  Returned in response               │
└─────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────┐
│  Adaptive Questions (7-15)          │
│  Evaluated in order                 │
│  Only asked if shouldAsk = true     │
└─────────────────────────────────────┘
  │
  ▼
COMPLETE (all applicable answered)
```

## Branch Categories

| Branch Key | Questions | Trigger Source |
|------------|-----------|----------------|
| `household` | children_ages, senior_count, pet_count | household, purpose |
| `lifestyle` | work_from_home, hosting_frequency, cooking_frequency | priorities |
| `design` | color_preference, material_preference | interior_style, priorities |
| `investment` | investment_horizon | purpose |
| `financial` | (future) | interior_budget, purpose |
| `behaviour` | (future) | lifestyle, priorities |

## Branch Path Tracking

Every answer records a `branchPath`:
```
"household=Couple > purpose=First Home > priorities=[storage,office] > interior_budget=800000 > interior_style=Modern Luxury > move_in_timeline=6-12 Months > children_ages=[school_age] > work_from_home=often"
```

Format: `key=value > key=value > ...`
- Values JSON-stringified for arrays/objects
- Used for: analytics, debugging, rule tracing

## Question Ordering

1. **Mandatory first**: All mandatory (order 1-6) before any adaptive
2. **Within category**: Adaptive questions sorted by `order` field
3. **Skip logic**: `shouldAskQuestion` checked before adding to pending
4. **Max cap**: Max 15 total questions (6 mandatory + 9 adaptive max)

## Edge Cases

### Circular Dependencies
- Prevented at questionnaire creation (validation)
- `dependsOn` question must have lower `order`

### Unanswered Prerequisites
- If prerequisite not answered yet → question not asked
- Resolved naturally by sequential mandatory flow

### Multi-Select Contains
- `priorities` is multi-select array
- `contains` operator checks if value in array
- Example: `dependsOn: { questionKey: "priorities", operator: "contains", value: "office" }`

### Slider Values
- Stored as number (e.g., `800000` for ₹8L)
- `gt`/`gte`/`lt`/`lte` work with numeric comparison

## Testing Matrix

| Scenario | household | purpose | priorities | Expected Adaptive |
|----------|-----------|---------|------------|-------------------|
| Single, first home, wants office | Just Me | First Home | [office] | work_from_home |
| Family, investment | Family | Investment | [storage] | children_ages, senior_count, investment_horizon |
| Couple, upgrading, kitchen focus | Couple | Upgrading | [kitchen] | cooking_frequency |
| Joint family, all priorities | Joint Family | First Home | [storage, kitchen, living_room, balcony] | All household + lifestyle |

## Performance

- Branch evaluation: O(n) where n = adaptive questions (max 9)
- Runs on every answer submission
- Cached questionnaire in memory (refreshed on version change)
- Negligible latency (<1ms)

## Extending Branches

To add new adaptive branch:
1. Add Question to Questionnaire with `dependsOn`
2. Add to appropriate `branchKey` category
3. Update `maxQuestions` if needed
4. Add rule coverage in Decision Engine for new fact keys
5. Test all dependency paths