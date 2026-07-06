# Decision Engine

## Overview
The Decision Engine transforms normalized planner data into structured decision intelligence. It is the single source of truth for all future recommendation logic.

## Components

### Fact Builder
Converts normalized planner data into objective facts.

**Facts Generated:**
- householdSize, adultCount, childrenCount, seniorCount, petCount
- workFromHome, remoteWorkDays, moveInMonths
- budget (currency + amountMinorUnits), budgetTier
- stylePreferences, guestFrequency, cookingFrequency, readingFrequency, fitnessFrequency, hostingFrequency
- storageNeed, laundryNeed, officeNeed

### Rule Engine
Configuration-driven rule system with 11 rules:
- RULE_REMOTE_WORK: Full remote workers need dedicated office
- RULE_HYBRID_WORK: Hybrid workers need flexible office
- RULE_LARGE_FAMILY_STORAGE: 2+ children → high storage
- RULE_LARGE_FAMILY_DINING: 5+ household → large dining
- RULE_CHILD_SAFETY: Children present → child safety
- RULE_BUDGET_PREMIUM: Luxury budget → premium finishes
- RULE_BUDGET_BUDGET: Budget tier → financing sensitive
- RULE_REMOTE_WORK_OFFICE: Remote work → office priority
- RULE_MOVE_IN_URGENT: Urgent move-in → bedroom/bathroom priority

Each rule execution logged with ruleId, matched, firedEffects, timestamp.

### Attribute Builder
Generates attributes from facts and rule results:
- Household: largeFamily, childrenPresent, seniorsPresent, petsPresent
- Lifestyle: remoteWorker, heavyCooking, socialHost, fitnessFocused, reader
- Financial: budgetTier, purchaseUrgency, financingSensitive
- Design: preferredStyles, materialPreference, lightingPreference, openLayoutPreference
- Usage: requiresOffice, requiresDining, requiresStorage, requiresLaundry, requiresUtility
- Safety: childSafetyRequired, petSafetyRequired, seniorAccessibilityRequired

Each attribute includes: value, confidence, triggeringRules

### Priority Engine
Calculates weighted priorities (0-100) for 13 categories:
Office, Kitchen, Dining, Storage, Living Room, Balcony, Bedroom, Utility, Safety, Accessibility, Entertainment, Lighting, Privacy

Scores include: score (0-100), confidence, triggeringRules

### Constraint Engine
Generates mandatory constraints:
- DedicatedOffice, LargeDining, HighStorage, ChildSafeLayout, PetFriendlyMaterials, SeniorAccessibleBathroom, LowMaintenanceMaterials, QuietWorkspace, NaturalLightingRequired

Each constraint: id, confidence, sourceRules, reason

## API

### POST /decision-engine/evaluate
Input: DecisionSnapshot
Output: Facts, Attributes, PriorityScores, Constraints, RuleExecutionLog, Metadata

## Data Model

### DecisionSnapshot
- id, buyerId, projectId, sessionId
- plannerVersion, questionnaireVersion, normalizationVersion, decisionEngineVersion
- generatedAt, facts, attributes, priorityScores, constraints, metadata, ruleExecutionLog
- createdAt, updatedAt

### DecisionEvaluation
- snapshotId, facts, attributes, priorityScores, constraints, evaluatedAt

## Usage
```bash
POST /api/v1/decision-engine/evaluate
{
  "snapshot": {
    "buyerId": "...",
    "projectId": "...",
    "sessionId": "...",
    "facts": {...},
    "attributes": {...},
    "priorityScores": {...},
    "constraints": {...}
  }
}
```