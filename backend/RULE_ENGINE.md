# Rule Engine

## Overview
Configuration-driven rule system that evaluates facts and produces effects (attributes, priorities, constraints). Rules are declarative, versioned, and auditable.

## Rule Structure
```json
{
  "id": "string",
  "name": "string",
  "version": "number",
  "enabled": "boolean",
  "priority": "number",
  "description": "string",
  "conditions": "RuleCondition[]",
  "effects": "RuleEffect[]"
}
```

## Condition Operators
- `eq`, `neq` - equality/inequality
- `gt`, `gte`, `lt`, `lte` - numeric comparisons
- `in` - value in array
- `contains` - array contains value

## Effect Types
- `attribute` - sets/updates an attribute
- `priority` - adjusts priority score
- `constraint` - adds/removes constraint

## Rule Registry
11 rules defined in `rule-registry.ts`:

1. **RULE_REMOTE_WORK** - Full remote → dedicated office
2. **RULE_HYBRID_WORK** - Hybrid → flexible office
3. **RULE_LARGE_FAMILY_STORAGE** - 2+ children → high storage
4. **RULE_LARGE_FAMILY_DINING** - 5+ household → large dining
5. **RULE_CHILD_SAFETY** - Children present → child safety
6. **RULE_BUDGET_PREMIUM** - Luxury budget → premium finishes
7. **RULE_BUDGET_BUDGET** - Budget tier → financing sensitive
8. **RULE_REMOTE_WORK_OFFICE** - Remote work → office priority
9. **RULE_MOVE_IN_URGENT** - Urgent move-in → bedroom/bathroom priority

## Execution
- Rules evaluated in priority order (highest first)
- All matching rules fire (no short-circuit)
- Effects aggregated, later rules can override earlier
- Every execution logged with ruleId, matched, firedEffects, timestamp

## Rule Execution Log Entry
```json
{
  "ruleId": "string",
  "ruleName": "string",
  "version": "number",
  "matched": "boolean",
  "firedEffects": "effect[]",
  "timestamp": "ISO8601"
}
```

## Conflict Resolution
- Higher priority rules override lower priority for same attribute
- Constraints are additive (all apply)
- Priority scores are additive with weights

## Versioning
- Rules versioned independently
- Rule registry versioned separately
- Breaking changes require new rule ID