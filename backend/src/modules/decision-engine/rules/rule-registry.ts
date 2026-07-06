export interface RuleCondition {
  fact: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "contains";
  value: any;
}

export interface RuleEffect {
  type: "attribute" | "priority" | "constraint" | "behaviour";
  key: string;
  value: any;
  confidence?: number;
  weight?: number;
  severity?: "critical" | "high" | "normal" | "low";
}

export interface RuleOverride {
  ruleKey: string;
  reason: string;
  enabled?: boolean;
  priority?: number;
  effects?: RuleEffect[];
  conditions?: RuleCondition[];
}

export interface Rule {
  id: string;
  name: string;
  version: number;
  enabled: boolean;
  priority: number;
  severity: "critical" | "high" | "normal" | "low";
  category:
    | "household"
    | "lifestyle"
    | "financial"
    | "design"
    | "safety"
    | "investment"
    | "behaviour";
  description: string;
  conditions: RuleCondition[];
  effects: RuleEffect[];
  overrides?: RuleOverride[];
  metadata?: Record<string, any>;
}

export interface BehaviourDimension {
  key: string;
  name: string;
  description: string;
  factors: string[];
  defaultScore: number;
}

export const RULE_REGISTRY: Rule[] = [
  // ===== HOUSEHOLD RULES =====
  {
    id: "RULE_REMOTE_WORK",
    name: "Remote Work Office Requirement",
    version: 1,
    enabled: true,
    priority: 10,
    severity: "high",
    category: "household",
    description: "Full remote workers need dedicated office space",
    conditions: [{ fact: "workFromHome", operator: "eq", value: "always" }],
    effects: [
      {
        type: "attribute",
        key: "requiresOffice",
        value: "dedicated",
        confidence: 0.95,
      },
      { type: "priority", key: "office", value: 90, weight: 1.0 },
      {
        type: "constraint",
        key: "DedicatedOffice",
        value: true,
        confidence: 0.95,
      },
    ],
  },
  {
    id: "RULE_HYBRID_WORK",
    name: "Hybrid Work Office Requirement",
    version: 1,
    enabled: true,
    priority: 8,
    severity: "normal",
    category: "household",
    description: "Hybrid workers need flexible office space",
    conditions: [{ fact: "workFromHome", operator: "eq", value: "often" }],
    effects: [
      {
        type: "attribute",
        key: "requiresOffice",
        value: "flexible",
        confidence: 0.8,
      },
      { type: "priority", key: "office", value: 70, weight: 0.8 },
      {
        type: "constraint",
        key: "DedicatedOffice",
        value: true,
        confidence: 0.7,
      },
    ],
  },
  {
    id: "RULE_LARGE_FAMILY_STORAGE",
    name: "Large Family Storage Need",
    version: 1,
    enabled: true,
    priority: 9,
    severity: "high",
    category: "household",
    description: "Families with 2+ children need high storage capacity",
    conditions: [{ fact: "childrenCount", operator: "gte", value: 2 }],
    effects: [
      {
        type: "attribute",
        key: "requiresStorage",
        value: "high",
        confidence: 0.9,
      },
      { type: "priority", key: "storage", value: 90, weight: 1.0 },
      { type: "constraint", key: "HighStorage", value: true, confidence: 0.95 },
    ],
  },
  {
    id: "RULE_LARGE_FAMILY_DINING",
    name: "Large Family Dining",
    version: 1,
    enabled: true,
    priority: 8,
    severity: "normal",
    category: "household",
    description: "Large households need large dining space",
    conditions: [{ fact: "householdSize", operator: "gte", value: 5 }],
    effects: [
      {
        type: "attribute",
        key: "requiresDining",
        value: "large",
        confidence: 0.9,
      },
      { type: "priority", key: "dining", value: 85, weight: 1.0 },
      { type: "constraint", key: "LargeDining", value: true, confidence: 0.9 },
    ],
  },
  {
    id: "RULE_CHILD_SAFETY",
    name: "Child Safety Required",
    version: 1,
    enabled: true,
    priority: 10,
    severity: "critical",
    category: "safety",
    description: "Households with children require child safety features",
    conditions: [{ fact: "childrenCount", operator: "gt", value: 0 }],
    effects: [
      {
        type: "attribute",
        key: "childSafetyRequired",
        value: true,
        confidence: 0.95,
      },
      {
        type: "constraint",
        key: "ChildSafeLayout",
        value: true,
        confidence: 0.95,
      },
      { type: "priority", key: "safety", value: 95, weight: 1.2 },
    ],
  },
  {
    id: "RULE_SENIOR_ACCESSIBILITY",
    name: "Senior Accessibility Required",
    version: 1,
    enabled: true,
    priority: 9,
    severity: "high",
    category: "safety",
    description: "Seniors require accessible design features",
    conditions: [{ fact: "seniorCount", operator: "gt", value: 0 }],
    effects: [
      {
        type: "attribute",
        key: "seniorAccessibilityRequired",
        value: true,
        confidence: 0.95,
      },
      {
        type: "constraint",
        key: "SeniorAccessibleBathroom",
        value: true,
        confidence: 0.9,
      },
      { type: "priority", key: "accessibility", value: 85, weight: 1.1 },
      { type: "priority", key: "safety", value: 85, weight: 1.0 },
    ],
  },
  {
    id: "RULE_PET_SAFETY",
    name: "Pet Safety Required",
    version: 1,
    enabled: true,
    priority: 7,
    severity: "normal",
    category: "safety",
    description: "Pet owners need pet-friendly materials",
    conditions: [{ fact: "petCount", operator: "gt", value: 0 }],
    effects: [
      {
        type: "attribute",
        key: "petSafetyRequired",
        value: true,
        confidence: 0.8,
      },
      {
        type: "constraint",
        key: "PetFriendlyMaterials",
        value: true,
        confidence: 0.8,
      },
      { type: "priority", key: "safety", value: 80, weight: 0.8 },
    ],
  },

  // ===== FINANCIAL RULES =====
  {
    id: "RULE_BUDGET_PREMIUM",
    name: "Premium Budget Tier",
    version: 1,
    enabled: true,
    priority: 7,
    severity: "normal",
    category: "financial",
    description: "Luxury budget buyers prefer premium finishes",
    conditions: [
      { fact: "interiorBudgetTier", operator: "eq", value: "luxury" },
    ],
    effects: [
      {
        type: "attribute",
        key: "financingSensitive",
        value: false,
        confidence: 0.8,
      },
      { type: "priority", key: "kitchen", value: 80, weight: 1.2 },
      { type: "priority", key: "livingRoom", value: 85, weight: 1.1 },
      {
        type: "behaviour",
        key: "luxuryOrientation",
        value: 85,
        confidence: 0.9,
      },
    ],
  },
  {
    id: "RULE_BUDGET_MID",
    name: "Mid Budget Tier",
    version: 1,
    enabled: true,
    priority: 7,
    severity: "normal",
    category: "financial",
    description: "Mid budget buyers balance quality and cost",
    conditions: [{ fact: "interiorBudgetTier", operator: "eq", value: "mid" }],
    effects: [
      {
        type: "attribute",
        key: "financingSensitive",
        value: false,
        confidence: 0.7,
      },
      { type: "priority", key: "utility", value: 65, weight: 1.0 },
      { type: "priority", key: "storage", value: 60, weight: 0.9 },
      {
        type: "behaviour",
        key: "comfortOrientation",
        value: 70,
        confidence: 0.8,
      },
    ],
  },
  {
    id: "RULE_BUDGET_BUDGET",
    name: "Budget Conscious Tier",
    version: 1,
    enabled: true,
    priority: 7,
    severity: "normal",
    category: "financial",
    description: "Budget tier buyers are financing sensitive",
    conditions: [
      { fact: "interiorBudgetTier", operator: "eq", value: "budget" },
    ],
    effects: [
      {
        type: "attribute",
        key: "financingSensitive",
        value: true,
        confidence: 0.9,
      },
      { type: "priority", key: "utility", value: 70, weight: 1.1 },
      { type: "priority", key: "storage", value: 60, weight: 0.8 },
      {
        type: "behaviour",
        key: "maintenanceOrientation",
        value: 82,
        confidence: 0.85,
      },
    ],
  },
  {
    id: "RULE_MOVE_IN_URGENT",
    name: "Urgent Move-in Timeline",
    version: 1,
    enabled: true,
    priority: 8,
    severity: "high",
    category: "financial",
    description: "Urgent move-in increases bedroom/bathroom priority",
    conditions: [{ fact: "moveInMonths", operator: "lt", value: 3 }],
    effects: [
      {
        type: "attribute",
        key: "purchaseUrgency",
        value: "high",
        confidence: 0.95,
      },
      { type: "priority", key: "bedroom", value: 70, weight: 1.1 },
      { type: "priority", key: "bathroom", value: 70, weight: 1.1 },
    ],
  },
  {
    id: "RULE_MOVE_IN_EXPLORING",
    name: "Exploring Move-in Timeline",
    version: 1,
    enabled: true,
    priority: 5,
    severity: "low",
    category: "financial",
    description: "Exploratory buyers have low urgency",
    conditions: [{ fact: "moveInMonths", operator: "gt", value: 12 }],
    effects: [
      {
        type: "attribute",
        key: "purchaseUrgency",
        value: "low",
        confidence: 0.9,
      },
      { type: "priority", key: "bedroom", value: 40, weight: 0.8 },
      { type: "behaviour", key: "futurePlanning", value: 75, confidence: 0.8 },
    ],
  },

  // ===== DESIGN RULES =====
  {
    id: "RULE_STYLE_LUXURY",
    name: "Luxury Style Preference",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "design",
    description: "Luxury style buyers prefer high-end materials",
    conditions: [
      { fact: "preferredStyles", operator: "contains", value: "luxury" },
    ],
    effects: [
      {
        type: "attribute",
        key: "materialPreference",
        value: "premium-natural",
        confidence: 0.8,
      },
      {
        type: "attribute",
        key: "lightingPreference",
        value: "warm-ambient",
        confidence: 0.75,
      },
      {
        type: "behaviour",
        key: "luxuryOrientation",
        value: 78,
        confidence: 0.85,
      },
    ],
  },
  {
    id: "RULE_STYLE_MINIMALIST",
    name: "Minimalist Style Preference",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "design",
    description: "Minimalist buyers prefer clean, simple designs",
    conditions: [
      { fact: "preferredStyles", operator: "contains", value: "minimalist" },
    ],
    effects: [
      {
        type: "attribute",
        key: "materialPreference",
        value: "light-wood",
        confidence: 0.75,
      },
      {
        type: "attribute",
        key: "lightingPreference",
        value: "bright-indirect",
        confidence: 0.75,
      },
      {
        type: "behaviour",
        key: "comfortOrientation",
        value: 65,
        confidence: 0.7,
      },
      {
        type: "behaviour",
        key: "maintenanceOrientation",
        value: 78,
        confidence: 0.75,
      },
    ],
  },
  {
    id: "RULE_STYLE_SCANDINAVIAN",
    name: "Scandinavian Style Preference",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "design",
    description: "Scandinavian style prefers light woods and natural light",
    conditions: [
      { fact: "preferredStyles", operator: "contains", value: "scandinavian" },
    ],
    effects: [
      {
        type: "attribute",
        key: "materialPreference",
        value: "light-wood",
        confidence: 0.8,
      },
      {
        type: "attribute",
        key: "lightingPreference",
        value: "bright-indirect",
        confidence: 0.8,
      },
      {
        type: "attribute",
        key: "opennessPreference",
        value: "open",
        confidence: 0.8,
      },
      {
        type: "behaviour",
        key: "comfortOrientation",
        value: 72,
        confidence: 0.75,
      },
    ],
  },
  {
    id: "RULE_STYLE_WARM",
    name: "Warm Style Preference",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "design",
    description: "Warm style buyers prefer cozy, family-oriented spaces",
    conditions: [
      { fact: "preferredStyles", operator: "contains", value: "warm" },
    ],
    effects: [
      {
        type: "attribute",
        key: "materialPreference",
        value: "warm-wood",
        confidence: 0.8,
      },
      {
        type: "attribute",
        key: "lightingPreference",
        value: "warm-ambient",
        confidence: 0.8,
      },
      {
        type: "behaviour",
        key: "familyOrientation",
        value: 78,
        confidence: 0.8,
      },
      {
        type: "behaviour",
        key: "comfortOrientation",
        value: 75,
        confidence: 0.75,
      },
      {
        type: "behaviour",
        key: "hostingOrientation",
        value: 65,
        confidence: 0.7,
      },
    ],
  },

  // ===== LIFESTYLE RULES =====
  {
    id: "RULE_LIFESTYLE_WELLNESS",
    name: "Wellness Lifestyle",
    version: 1,
    enabled: true,
    priority: 7,
    severity: "normal",
    category: "lifestyle",
    description: "Wellness-focused buyers prioritize natural light and balcony",
    conditions: [
      { fact: "primaryLifestyle", operator: "eq", value: "wellness" },
    ],
    effects: [
      { type: "priority", key: "balcony", value: 80, weight: 1.1 },
      { type: "priority", key: "lighting", value: 75, weight: 1.1 },
      {
        type: "attribute",
        key: "lightingPreference",
        value: "circadian-tuned",
        confidence: 0.8,
      },
      {
        type: "behaviour",
        key: "wellnessOrientation",
        value: 85,
        confidence: 0.9,
      },
    ],
  },
  {
    id: "RULE_LIFESTYLE_QUIET",
    name: "Quiet Lifestyle",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "lifestyle",
    description: "Quiet lifestyle buyers value privacy and tranquility",
    conditions: [{ fact: "primaryLifestyle", operator: "eq", value: "quiet" }],
    effects: [
      { type: "priority", key: "privacy", value: 85, weight: 1.1 },
      { type: "priority", key: "livingRoom", value: 65, weight: 0.8 },
      {
        type: "behaviour",
        key: "privacyOrientation",
        value: 88,
        confidence: 0.9,
      },
      {
        type: "behaviour",
        key: "hostingOrientation",
        value: 35,
        confidence: 0.8,
      },
    ],
  },
  {
    id: "RULE_LIFESTYLE_SOCIAL",
    name: "Social Lifestyle",
    version: 1,
    enabled: true,
    priority: 6,
    severity: "normal",
    category: "lifestyle",
    description: "Social buyers need hosting-friendly spaces",
    conditions: [{ fact: "primaryLifestyle", operator: "eq", value: "social" }],
    effects: [
      { type: "priority", key: "livingRoom", value: 85, weight: 1.15 },
      { type: "priority", key: "dining", value: 75, weight: 1.1 },
      { type: "priority", key: "kitchen", value: 75, weight: 1.1 },
      {
        type: "behaviour",
        key: "hostingOrientation",
        value: 88,
        confidence: 0.9,
      },
      {
        type: "behaviour",
        key: "privacyOrientation",
        value: 40,
        confidence: 0.8,
      },
    ],
  },

  // ===== BEHAVIOUR RULES =====
  {
    id: "RULE_FAMILY_ORIENTATION",
    name: "Family Orientation Detection",
    version: 1,
    enabled: true,
    priority: 5,
    severity: "normal",
    category: "behaviour",
    description: "Families with children show strong family orientation",
    conditions: [{ fact: "childrenCount", operator: "gt", value: 0 }],
    effects: [
      {
        type: "behaviour",
        key: "familyOrientation",
        value: 82,
        confidence: 0.85,
      },
    ],
  },
  {
    id: "RULE_INVESTMENT_ORIENTATION",
    name: "Investment Orientation Detection",
    version: 1,
    enabled: true,
    priority: 5,
    severity: "normal",
    category: "behaviour",
    description: "Investment buyers show future planning orientation",
    conditions: [
      { fact: "purchasePurpose", operator: "eq", value: "Investment" },
    ],
    effects: [
      { type: "behaviour", key: "futurePlanning", value: 85, confidence: 0.85 },
      {
        type: "behaviour",
        key: "familyOrientation",
        value: 35,
        confidence: 0.7,
      },
    ],
  },
  {
    id: "RULE_FIRST_HOME",
    name: "First Home Buyer",
    version: 1,
    enabled: true,
    priority: 5,
    severity: "normal",
    category: "behaviour",
    description: "First home buyers show excitement and future planning",
    conditions: [
      { fact: "purchasePurpose", operator: "eq", value: "First Home" },
    ],
    effects: [
      { type: "behaviour", key: "futurePlanning", value: 72, confidence: 0.8 },
      {
        type: "behaviour",
        key: "familyOrientation",
        value: 65,
        confidence: 0.7,
      },
    ],
  },
  {
    id: "RULE_WFH_OFFICE_PRIORITY",
    name: "Work From Home Office Priority",
    version: 1,
    enabled: true,
    priority: 9,
    severity: "high",
    category: "household",
    description: "WFH workers prioritize office space",
    conditions: [
      { fact: "workFromHome", operator: "in", value: ["always", "often"] },
    ],
    effects: [
      { type: "priority", key: "office", value: 85, weight: 1.1 },
      { type: "priority", key: "utility", value: 40, weight: 0.7 },
    ],
  },
];

export const BEHAVIOUR_DIMENSIONS: BehaviourDimension[] = [
  {
    key: "privacyOrientation",
    name: "Privacy Orientation",
    description:
      "Preference for private, quiet spaces over shared/social spaces",
    factors: [
      "prefersQuiet",
      "primaryLifestyle",
      "householdSize",
      "hostingFrequency",
    ],
    defaultScore: 50,
  },
  {
    key: "hostingOrientation",
    name: "Hosting Orientation",
    description: "Preference for entertaining guests and social gatherings",
    factors: [
      "primaryLifestyle",
      "hostingFrequency",
      "guestFrequency",
      "householdSize",
    ],
    defaultScore: 50,
  },
  {
    key: "luxuryOrientation",
    name: "Luxury Orientation",
    description: "Preference for premium, high-end finishes and materials",
    factors: ["interiorBudgetTier", "preferredStyles", "materialPreference"],
    defaultScore: 50,
  },
  {
    key: "comfortOrientation",
    name: "Comfort Orientation",
    description: "Preference for comfortable, cozy, and warm spaces",
    factors: [
      "preferredStyles",
      "materialPreference",
      "lightingPreference",
      "primaryLifestyle",
    ],
    defaultScore: 50,
  },
  {
    key: "maintenanceOrientation",
    name: "Maintenance Orientation",
    description: "Preference for low-maintenance, durable materials",
    factors: [
      "interiorBudgetTier",
      "householdSize",
      "childrenCount",
      "petCount",
      "preferredStyles",
    ],
    defaultScore: 50,
  },
  {
    key: "futurePlanning",
    name: "Future Planning",
    description: "Long-term orientation in purchase decisions",
    factors: [
      "purchasePurpose",
      "moveInMonths",
      "householdSize",
      "interiorBudgetTier",
    ],
    defaultScore: 50,
  },
  {
    key: "wellnessOrientation",
    name: "Wellness Orientation",
    description: "Focus on health, natural elements, and well-being",
    factors: [
      "primaryLifestyle",
      "prefersBalcony",
      "preferredFloorLevel",
      "lightingPreference",
    ],
    defaultScore: 50,
  },
  {
    key: "technologyAffinity",
    name: "Technology Affinity",
    description: "Preference for smart home and technology features",
    factors: ["workFromHome", "needsHomeOffice", "interiorBudgetTier"],
    defaultScore: 50,
  },
  {
    key: "familyOrientation",
    name: "Family Orientation",
    description: "Preference for family-friendly spaces and features",
    factors: [
      "childrenCount",
      "householdSize",
      "purchasePurpose",
      "preferredStyles",
    ],
    defaultScore: 50,
  },
];

export interface RuleConflict {
  key: string;
  type: string;
  winnerRuleId: string;
  loserRuleId: string;
  winnerValue: any;
  loserValue: any;
  resolutionReason: string;
}

export class RuleRegistryService {
  private rules: Rule[] = [...RULE_REGISTRY];

  getRules(): Rule[] {
    return this.rules.filter((r) => r.enabled);
  }

  getRuleById(id: string): Rule | undefined {
    return this.rules.find((r) => r.id === id);
  }

  getRulesByCategory(category: string): Rule[] {
    return this.rules.filter((r) => r.category === category && r.enabled);
  }

  getRulesBySeverity(severity: string): Rule[] {
    return this.rules.filter((r) => r.severity === severity && r.enabled);
  }

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  disableRule(id: string): void {
    const rule = this.rules.find((r) => r.id === id);
    if (rule) rule.enabled = false;
  }

  enableRule(id: string): void {
    const rule = this.rules.find((r) => r.id === id);
    if (rule) rule.enabled = true;
  }

  overrideRule(ruleId: string, overrides: RuleOverride): void {
    const rule = this.rules.find((r) => r.id === ruleId);
    if (rule) {
      rule.overrides = rule.overrides || [];
      rule.overrides.push(overrides);
    }
  }

  resolveConflicts(effects: any[]): {
    resolved: any[];
    conflicts: RuleConflict[];
  } {
    const conflicts: any[] = [];
    const effectMap = new Map<string, any[]>();

    // Group effects by key
    for (const effect of effects) {
      const existing = effectMap.get(effect.key) || [];
      existing.push(effect);
      effectMap.set(effect.key, existing);
    }

    // Detect and resolve conflicts
    const resolved: any[] = [];
    for (const [key, group] of effectMap) {
      if (group.length === 1) {
        resolved.push(group[0]);
      } else {
        // Sort by priority (highest first), then confidence
        group.sort((a, b) => {
          if (b.rulePriority !== a.rulePriority)
            return b.rulePriority - a.rulePriority;
          return (b.confidence || 0.5) - (a.confidence || 0.5);
        });

        const winner = group[0];
        resolved.push(winner);

        // Log conflicts
        for (let i = 1; i < group.length; i++) {
          conflicts.push({
            key,
            type: winner.type || "unknown",
            winnerRuleId: winner.ruleId,
            loserRuleId: group[i].ruleId,
            winnerValue: winner.value,
            loserValue: group[i].value,
            resolutionReason: `Higher priority (${winner.rulePriority}) and confidence (${winner.confidence})`,
          });
        }
      }
    }

    return { resolved, conflicts };
  }
}
