# Scenario Validation

## Overview
10 real-world scenarios to validate Decision Engine outputs. Each scenario defines input facts and expected outputs.

---

## Scenario 1: Young Professional Living Alone
**Input:**
- householdSize: 1, childrenCount: 0, seniorCount: 0, petCount: 0
- workFromHome: "always", moveInMonths: 6
- budget: 8000000 (80L), budgetTier: "mid"
- stylePreferences: ["modern", "minimalist"]
- guestFrequency: "monthly", cookingFrequency: "occasionally"

**Expected Output:**
- Facts: householdSize=1, childrenCount=0, budgetTier="mid", workFromHome="always"
- Attributes: remoteWorker=true, requiresOffice="dedicated", budgetTier="mid"
- Priorities: office=90, bedroom=70, livingRoom=60, storage=40
- Constraints: DedicatedOffice, NaturalLightingRequired
- Rule Log: RULE_REMOTE_WORK matched, RULE_REMOTE_WORK_OFFICE matched

---

## Scenario 2: Newly Married Couple
**Input:**
- householdSize: 2, childrenCount: 0, seniorCount: 0, petCount: 0
- workFromHome: "hybrid", moveInMonths: 12
- budget: 12000000 (1.2Cr), budgetTier: "premium"
- stylePreferences: ["modern", "luxury"]

**Expected Output:**
- Attributes: remoteWorker=true (flexible office), budgetTier="premium", preferredStyles=["modern","luxury"]
- Priorities: office=70, bedroom=75, livingRoom=65, balcony=65
- Constraints: DedicatedOffice (flexible), NaturalLightingRequired
- Rule Log: RULE_HYBRID_WORK, RULE_BUDGET_PREMIUM, RULE_REMOTE_WORK_OFFICE

---

## Scenario 3: Family with Four Children
**Input:**
- householdSize: 6, childrenCount: 4, seniorCount: 0, petCount: 1
- workFromHome: "sometimes", moveInMonths: 3
- budget: 12000000 (1.2Cr), budgetTier: "premium"
- cookingFrequency: "daily", guestFrequency: "weekly"

**Expected Output:**
- Facts: householdSize=6, childrenCount=4, petCount=1, budgetTier="premium"
- Attributes: largeFamily=true, childrenPresent=true, petsPresent=true, requiresStorage="high", requiresDining="large", childSafetyRequired=true, petSafetyRequired=true
- Priorities: storage=95, dining=92, kitchen=85, office=60, safety=95
- Constraints: LargeDining, HighStorage, ChildSafeLayout, PetFriendlyMaterials, DedicatedOffice (flexible), NaturalLightingRequired
- Rule Log: RULE_LARGE_FAMILY_STORAGE, RULE_LARGE_FAMILY_DINING, RULE_CHILD_SAFETY, RULE_PET_SAFETY, RULE_HYBRID_WORK

---

## Scenario 4: Family with Senior Citizens
**Input:**
- householdSize: 4, childrenCount: 1, seniorCount: 2, petCount: 0
- workFromHome: "never", moveInMonths: 6
- budget: 10000000 (1Cr), budgetTier: "mid"
- lifestyle: "wellness", guestFrequency: "rarely"

**Expected Output:**
- Attributes: seniorsPresent=true, requiresOffice="optional", seniorAccessibilityRequired=true
- Priorities: accessibility=85, safety=85, bedroom=70, bathroom=70
- Constraints: SeniorAccessibleBathroom, NaturalLightingRequired, ChildSafeLayout
- Rule Log: RULE_SENIOR_ACCESSIBILITY, RULE_CHILD_SAFETY

---

## Scenario 5: Luxury Buyer
**Input:**
- householdSize: 2, childrenCount: 0, seniorCount: 0, petCount: 0
- workFromHome: "always", moveInMonths: 12
- budget: 50000000 (5Cr), budgetTier: "luxury"
- stylePreferences: ["modern", "luxury"], guestFrequency: "weekly"

**Expected Output:**
- Attributes: budgetTier="luxury", financingSensitive=false, preferredStyles=["modern","luxury"], materialPreference="premium"
- Priorities: kitchen=90, livingRoom=95, bathroom=90, bedroom=90, lighting=80
- Constraints: DedicatedOffice, NaturalLightingRequired, LowMaintenanceMaterials (not required)
- Rule Log: RULE_REMOTE_WORK, RULE_BUDGET_PREMIUM, RULE_REMOTE_WORK_OFFICE

---

## Scenario 6: Budget-Conscious Buyer
**Input:**
- householdSize: 3, childrenCount: 1, seniorCount: 0, petCount: 0
- workFromHome: "never", moveInMonths: 12
- budget: 4500000 (45L), budgetTier: "budget"
- stylePreferences: ["modern"]

**Expected Output:**
- Attributes: budgetTier="budget", financingSensitive=true, purchaseUrgency="low"
- Priorities: utility=70, storage=60, kitchen=50, office=30
- Constraints: LowMaintenanceMaterials, ChildSafeLayout
- Rule Log: RULE_BUDGET_BUDGET, RULE_CHILD_SAFETY

---

## Scenario 7: Investor Purchasing to Rent
**Input:**
- householdSize: 1, childrenCount: 0, seniorCount: 0, petCount: 0
- workFromHome: "never", moveInMonths: 1
- budget: 7000000 (70L), budgetTier: "mid"
- stylePreferences: ["modern"], guestFrequency: "rarely"

**Expected Output:**
- Attributes: purchaseUrgency="high", budgetTier="mid", preferredStyles=["modern"]
- Priorities: bedroom=70, bathroom=70, utility=60, kitchen=55
- Constraints: LowMaintenanceMaterials, NaturalLightingRequired
- Rule Log: RULE_MOVE_IN_URGENT, RULE_BUDGET_MID

---

## Scenario 8: Pet Owner
**Input:**
- householdSize: 2, childrenCount: 0, seniorCount: 0, petCount: 2
- workFromHome: "hybrid", moveInMonths: 6
- budget: 15000000 (1.5Cr), budgetTier: "premium"
- stylePreferences: ["modern", "warm"]

**Expected Output:**
- Attributes: petsPresent=true, petSafetyRequired=true, budgetTier="premium", preferredStyles=["modern","warm"]
- Priorities: livingRoom=70, balcony=65, storage=60, safety=85
- Constraints: PetFriendlyMaterials, DedicatedOffice (flexible), NaturalLightingRequired
- Rule Log: RULE_PET_SAFETY, RULE_HYBRID_WORK, RULE_BUDGET_PREMIUM

---

## Scenario 9: Remote Worker
**Input:**
- householdSize: 1, childrenCount: 0, seniorCount: 0, petCount: 0
- workFromHome: "always", moveInMonths: 3
- budget: 12000000 (1.2Cr), budgetTier: "premium"
- stylePreferences: ["modern", "minimalist"], guestFrequency: "monthly"

**Expected Output:**
- Attributes: remoteWorker=true, requiresOffice="dedicated", budgetTier="premium", preferredStyles=["modern","minimalist"]
- Priorities: office=95, bedroom=75, lighting=80, livingRoom=65
- Constraints: DedicatedOffice, QuietWorkspace, NaturalLightingRequired, LowMaintenanceMaterials
- Rule Log: RULE_REMOTE_WORK, RULE_REMOTE_WORK_OFFICE, RULE_MOVE_IN_URGENT, RULE_BUDGET_PREMIUM

---

## Scenario 10: Large Joint Family
**Input:**
- householdSize: 12, childrenCount: 6, seniorCount: 4, petCount: 0
- workFromHome: "never", moveInMonths: 6
- budget: 30000000 (3Cr), budgetTier: "luxury"
- cookingFrequency: "daily", guestFrequency: "daily", hostingFrequency: "weekly"

**Expected Output:**
- Facts: householdSize=12, childrenCount=6, seniorCount=4, budgetTier="luxury"
- Attributes: largeFamily=true, childrenPresent=true, seniorsPresent=true, requiresStorage="high", requiresDining="large", childSafetyRequired=true, seniorAccessibilityRequired=true
- Priorities: storage=98, dining=98, kitchen=95, safety=100, accessibility=95, livingRoom=90, bathroom=90
- Constraints: LargeDining, HighStorage, ChildSafeLayout, SeniorAccessibleBathroom, DedicatedOffice (optional), NaturalLightingRequired, LowMaintenanceMaterials
- Rule Log: RULE_LARGE_FAMILY_STORAGE, RULE_LARGE_FAMILY_DINING, RULE_CHILD_SAFETY, RULE_SENIOR_ACCESSIBILITY, RULE_BUDGET_PREMIUM, RULE_LARGE_FAMILY_STORAGE

---

## Validation Criteria
For each scenario:
1. ✅ Facts match input exactly
2. ✅ Attributes derived correctly from facts + rules
3. ✅ Priorities within expected ranges
4. ✅ Constraints match expected set (no missing, no extra)
4. ✅ Rule execution log contains expected rules
5. ✅ Deterministic: identical input → identical output
5. ✅ No conflicting constraints
5. ✅ No runtime exceptions