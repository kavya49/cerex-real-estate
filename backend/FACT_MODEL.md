# Fact Model

## Overview
Facts are deterministic, objective pieces of information derived from normalized planner answers. Each fact is immutable once created and serves as the foundation for all downstream decision logic.

## Fact Structure
```json
{
  "key": "string",
  "value": "any",
  "type": "string|number|boolean|object|array",
  "source": "string",
  "confidence": 0.0-1.0
}
```

## Fact Categories

### Household
| Key | Type | Source | Confidence | Description |
|-----|------|--------|------------|-------------|
| householdSize | number | planner.answers.familySize | 1.0 | Total household members |
| adultCount | number | derived | 0.9 | Adults = householdSize - childrenCount |
| childrenCount | number | planner.answers.children | 1.0 | Number of children |
| seniorCount | number | default | 0.5 | Number of seniors |
| petCount | number | default | 0.5 | Number of pets |

### Work & Lifestyle
| Key | Type | Source | Confidence | Description |
|-----|------|--------|------------|-------------|
| workFromHome | string | planner.answers.workFromHome | 1.0 | always/often/sometimes/never/hybrid |
| remoteWorkDays | number | derived | 0.8 | Mapped from workFromHome |
| moveInMonths | number | planner.answers.timeline | 0.9 | Months until move-in |
| guestFrequency | string | default | 0.3 | weekly/monthly/rarely |
| cookingFrequency | string | default | 0.3 | daily/weekly/rarely |
| readingFrequency | string | default | 0.3 | daily/weekly/rarely |
| fitnessFrequency | string | default | 0.3 | daily/weekly/rarely |
| hostingFrequency | string | default | 0.3 | daily/weekly/rarely |

### Financial
| Key | Type | Source | Confidence | Description |
|-----|------|--------|------------|-------------|
| budget | object | planner.answers.budget | 1.0 | {currency: "INR", amountMinorUnits: number} |
| budgetTier | string | derived | 0.9 | luxury/premium/mid/budget |

### Preferences
| Key | Type | Source | Confidence | Description |
|-----|------|--------|------------|-------------|
| stylePreferences | array | planner.answers.style | 1.0 | Array of style tokens |
| guestFrequency | string | default | 0.3 | monthly/weekly/rarely |
| cookingFrequency | string | default | 0.3 | daily/weekly/rarely |
| readingFrequency | string | default | 0.3 | daily/weekly/rarely |
| fitnessFrequency | string | default | 0.3 | daily/weekly/rarely |
| hostingFrequency | string | default | 0.3 | monthly/weekly/rarely |

### Needs
| Key | Type | Source | Confidence | Description |
|-----|------|--------|------------|-------------|
| storageNeed | string | derived | 0.7 | high/medium/low |
| laundryNeed | string | derived | 0.7 | high/medium/low |
| officeNeed | string | derived | 0.8 | required/flexible/optional |

## Fact Immutability
Once created, facts are immutable. Any re-evaluation creates a new DecisionSnapshot with updated facts.

## Validation
- All facts must have a source traceable to planner answers or explicit derivation
- Confidence must be between 0.0 and 1.0
- Type must match declared type
- Facts are validated before being passed to rule engine