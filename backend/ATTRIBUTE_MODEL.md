# Attribute Model

## Overview
Attributes are derived insights generated from facts and rule results. Each attribute is a structured object with metadata for traceability.

## Attribute Structure
```json
{
  "key": "string",
  "value": "any",
  "confidence": "number (0.0-1.0)",
  "source": "string",
  "triggeringRules": "string[]"
}
```

## Attribute Categories

### Household
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| largeFamily | boolean | householdSize >= 5 | 0.9 |
| childrenPresent | boolean | childrenCount > 0 | 1.0 |
| seniorsPresent | boolean | seniorCount > 0 | 0.8 |
| petsPresent | boolean | petCount > 0 | 0.7 |

### Lifestyle
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| remoteWorker | boolean | workFromHome in [always, often] | 0.95 |
| heavyCooking | boolean | cookingFrequency == daily | 0.7 |
| socialHost | boolean | guestFrequency == weekly | 0.6 |
| fitnessFocused | boolean | fitnessFrequency == daily | 0.6 |
| reader | boolean | readingFrequency == daily | 0.6 |

### Financial
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| budgetTier | string | luxury/premium/mid/budget | 0.9 |
| purchaseUrgency | string | high/medium/low | 0.7 |
| financingSensitive | boolean | budgetTier == budget | 0.8 |

### Design
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| preferredStyles | array | from stylePreferences | 1.0 |
| materialPreference | string | inferred | 0.7 |
| lightingPreference | string | inferred | 0.7 |
| openLayoutPreference | boolean | inferred | 0.7 |

### Usage
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| requiresOffice | string | dedicated/flexible/optional | 0.9 |
| requiresDining | string | large/standard | 0.7 |
| requiresStorage | string | high/standard | 0.9 |
| requiresLaundry | string | standard/enhanced | 0.7 |
| requiresUtility | string | standard/enhanced | 0.7 |

### Safety
| Key | Type | Description | Typical Confidence |
|-----|------|-------------|-------------------|
| childSafetyRequired | boolean | childrenCount > 0 | 0.95 |
| petSafetyRequired | boolean | petCount > 0 | 0.7 |
| seniorAccessibilityRequired | boolean | seniorCount > 0 | 0.8 |

## Attribute Metadata
Each attribute carries:
- **value**: the computed value
- **confidence**: 0.0-1.0 certainty
- **source**: origin (planner.answers.*, derived, default, RULE_*)
- **triggeringRules**: array of rule IDs that contributed

## Attribute Immutability
Attributes are computed per DecisionSnapshot and immutable within that snapshot. Re-evaluation creates new snapshot.