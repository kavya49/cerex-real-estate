# Explainability

## Overview
Every output from the Decision Intelligence platform includes full traceability: **source, confidence, triggering rules, reasoning**. This enables sales teams to understand WHY a recommendation was made, and supports debugging, auditing, and continuous improvement.

## Explainability Structure

```json
{
  "facts": { "factKey": { "source", "confidence", "triggeringRules", "reasoning" } },
  "attributes": { "attrKey": { "source", "confidence", "triggeringRules", "reasoning" } },
  "priorities": { "priorityKey": { "source", "confidence", "triggeringRules", "reasoning" } },
  "constraints": { "constraintId": { "source", "confidence", "triggeringRules", "reasoning" } },
  "behaviours": { "dimensionKey": { "source", "confidence", "triggeringRules", "contributingFacts", "reasoning" } },
  "conflicts": [{ "field", "winnerRuleId", "loserRuleId", "winnerValue", "loserValue", "resolutionReason" }]
}
```

## Fact Explainability

Every fact includes:
```json
{
  "source": "planner.answers.household",
  "confidence": 1.0,
  "triggeringRules": [],
  "reasoning": "Direct from planner answer: household=Couple"
}
```

**Source Types**:
- `planner.answers.*` - Direct from planner
- `derived` - Computed from other facts
- `default` - System default (low confidence)

## Attribute Explainability

Attributes can come from:
1. **Direct fact mapping**: `childrenPresent` from `childrenCount > 0`
2. **Rule effects**: `requiresOffice = "dedicated"` from RULE_REMOTE_WORK
3. **Inference**: `materialPreference = "light-wood"` from stylePreferences

```json
{
  "source": "RULE_REMOTE_WORK",
  "confidence": 0.95,
  "triggeringRules": ["RULE_REMOTE_WORK"],
  "reasoning": "Applied RULE_REMOTE_WORK (severity: high, priority: 10): Full remote workers need dedicated office space"
}
```

## Priority Explainability

```json
{
  "source": "RULE_REMOTE_WORK + RULE_WFH_OFFICE_PRIORITY",
  "confidence": 0.9,
  "triggeringRules": ["RULE_REMOTE_WORK", "RULE_WFH_OFFICE_PRIORITY"],
  "reasoning": "Office priority: base 85 (RULE_REMOTE_WORK) + modifier from RULE_WFH_OFFICE_PRIORITY"
}
```

## Constraint Explainability

```json
{
  "source": "RULE_CHILD_SAFETY",
  "confidence": 0.95,
  "triggeringRules": ["RULE_CHILD_SAFETY"],
  "reasoning": "ChildSafeLayout required because buyer has children (RULE_CHILD_SAFETY, severity: critical)"
}
```

## Behaviour Dimension Explainability

```json
{
  "source": "facts + rules",
  "confidence": 0.72,
  "triggeringRules": ["RULE_LIFESTYLE_QUIET", "RULE_FAMILY_ORIENTATION"],
  "contributingFacts": ["prefersQuiet", "primaryLifestyle", "childrenCount"],
  "reasoning": "Privacy Orientation: based on prefersQuiet, primaryLifestyle, householdSize, hostingFrequency"
}
```

## Conflict Explainability

When multiple rules affect the same output:

```json
{
  "field": "requiresOffice",
  "winnerRuleId": "RULE_REMOTE_WORK",
  "loserRuleId": "RULE_HYBRID_WORK",
  "winnerValue": "dedicated",
  "loserValue": "flexible",
  "resolutionReason": "Higher priority (10 vs 8) and confidence (0.95 vs 0.8)"
}
```

**Resolution Order**:
1. Severity (critical > high > normal > low)
2. Priority (higher wins)
3. Confidence (higher wins)
4. Rule ID (deterministic tiebreaker)

## Database Storage

### DecisionExplanation Model
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

  evaluation DecisionEvaluation @relation(fields: [evaluationId], references: [id], onDelete: Cascade)
}
```

### RuleExecutionLog
```json
{
  "ruleId": "RULE_REMOTE_WORK",
  "ruleName": "Remote Work Office Requirement",
  "version": 1,
  "category": "household",
  "severity": "high",
  "matched": true,
  "firedEffects": [
    { "type": "attribute", "key": "requiresOffice", "value": "dedicated", "confidence": 0.95 },
    { "type": "priority", "key": "office", "value": 90, "weight": 1.0 },
    { "type": "constraint", "key": "DedicatedOffice", "value": true, "confidence": 0.95 }
  ],
  "timestamp": "2026-07-07T10:30:00.000Z"
}
```

## Frontend Integration

Sales dashboard shows:
- **Why this layout?** → Priority scores + constraints
- **Why this furniture?** → Attributes + style preferences
- **Buyer DNA summary** → Behaviour dimensions
- **Confidence indicators** → High/Medium/Low per insight

## Audit Trail

Every DecisionSnapshot evaluation creates:
1. DecisionEvaluation (immutable snapshot of outputs)
2. DecisionExplanation records (one per output field)
3. BehaviourDimension records
4. RuleExecutionLog in snapshot

Enables:
- Historical comparison (how did evaluation change?)
- Debugging (why did rule X fire?)
- Compliance (show decision trail)
- A/B testing (compare engine versions)

## Confidence Scoring

| Source | Base Confidence |
|--------|----------------|
| Direct planner answer | 1.0 |
| Derived from answers | 0.9 |
| Rule effect (critical) | 0.95 |
| Rule effect (high) | 0.9 |
| Rule effect (normal) | 0.8 |
| Rule effect (low) | 0.7 |
| Default/assumption | 0.3-0.5 |

Confidence propagates: Rule output confidence = min(rule confidence, fact confidences used)

## Testing Explainability

Validation criteria for each scenario:
- [ ] Every fact has source + confidence
- [ ] Every attribute traces to fact(s) or rule(s)
- [ ] Every priority has reasoning + triggering rules
- [ ] Every constraint has source rule + reason
- [ ] Every behaviour has contributing facts + rules
- [ ] All conflicts logged with resolution reason
- [ ] Identical input → identical explainability output