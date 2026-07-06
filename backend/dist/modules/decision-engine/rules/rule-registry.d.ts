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
    category: "household" | "lifestyle" | "financial" | "design" | "safety" | "investment" | "behaviour";
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
export declare const RULE_REGISTRY: Rule[];
export declare const BEHAVIOUR_DIMENSIONS: BehaviourDimension[];
export interface RuleConflict {
    key: string;
    type: string;
    winnerRuleId: string;
    loserRuleId: string;
    winnerValue: any;
    loserValue: any;
    resolutionReason: string;
}
export declare class RuleRegistryService {
    private rules;
    getRules(): Rule[];
    getRuleById(id: string): Rule | undefined;
    getRulesByCategory(category: string): Rule[];
    getRulesBySeverity(severity: string): Rule[];
    addRule(rule: Rule): void;
    disableRule(id: string): void;
    enableRule(id: string): void;
    overrideRule(ruleId: string, overrides: RuleOverride): void;
    resolveConflicts(effects: any[]): {
        resolved: any[];
        conflicts: RuleConflict[];
    };
}
