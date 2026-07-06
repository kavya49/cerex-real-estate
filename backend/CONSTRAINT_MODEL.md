# Constraint Model

## Overview
Constraints are mandatory requirements that the Recommendation Engine must obey. They are hard requirements, not suggestions.

## Constraint Structure
```json
{
  "id": "string",
  "confidence": "number (0.0-1.0)",
  "sourceRules": "string[]",
  "reason": "string"
}
```

## Constraint Categories

### Spatial
| ID | Description | Confidence | Source Rules |
|----|-------------|------------|--------------|
| DedicatedOffice | Separate room for office work | 0.95 | RULE_REMOTE_WORK, RULE_HYBRID_WORK, RULE_REMOTE_WORK_OFFICE |
| LargeDining | Dining space for 6+ people | 0.9 | RULE_LARGE_FAMILY_DINING |
| HighStorage | Extensive built-in storage | 0.95 | RULE_LARGE_FAMILY_STORAGE |
| DedicatedOffice | Separate room for office work | 0.95 | RULE_REMOTE_WORK, RULE_HYBRID_WORK, RULE_REMOTE_WORK_OFFICE |

### Safety
| ID | Description | Confidence | Source Rules |
|----|-------------|------------|--------------|
| ChildSafeLayout | Rounded corners, secure cabinets, outlet covers | 0.95 | RULE_CHILD_SAFETY |
| PetFriendlyMaterials | Scratch-resistant floors, pet-safe fabrics | 0.8 | RULE_PET_SAFETY |
| SeniorAccessibleBathroom | Grab bars, walk-in shower, comfort-height toilet | 0.9 | RULE_SENIOR_ACCESSIBILITY |
| NoGlassFurniture | No glass tables/shelves in child areas | 0.85 | RULE_CHILD_SAFETY |
| QuietWorkspace | Sound isolation for office | 0.85 | RULE_REMOTE_WORK, RULE_QUIET_WORKSPACE |

### Materials
| ID | Description | Confidence | Source Rules |
|----|-------------|------------|--------------|
| PetFriendlyMaterials | Scratch-resistant flooring, pet-safe fabrics | 0.8 | RULE_PET_SAFETY |
| LowMaintenanceMaterials | Easy-clean surfaces, durable finishes | 0.8 | RULE_BUDGET_BUDGET, RULE_LARGE_FAMILY_STORAGE |

### Environmental
| ID | Description | Confidence | Source Rules |
|----|-------------|------------|--------------|
| NaturalLightingRequired | Minimum 30% window-to-floor ratio | 0.85 | RULE_WELLNESS_FOCUSED, RULE_MOVE_IN_URGENT |
| QuietWorkspace | Sound isolation > 45dB | 0.85 | RULE_REMOTE_WORK, RULE_QUIET_WORKSPACE |

## Constraint Properties
Each constraint includes:
- **id**: unique identifier
- **confidence**: 0.0-1.0 certainty
- **sourceRules**: array of rule IDs that generated this constraint
- **reason**: human-readable explanation

## Constraint Behavior
- Constraints are **mandatory** - Recommendation Engine MUST satisfy all
- Constraints are additive - all apply simultaneously
- Conflicts resolved by highest confidence
- Constraints are immutable within a DecisionSnapshot

## Validation
- Constraints validated before recommendation generation
- Conflicting constraints flagged for manual review
- Missing constraints for applicable scenarios flagged