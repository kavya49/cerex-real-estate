export interface Attribute {
    key: string;
    value: any;
    confidence: number;
    source: string;
    triggeringRules: string[];
}
export interface PriorityScore {
    category: string;
    score: number;
    weight: number;
    reasoning?: string;
}
export interface AttributeResult {
    household: any;
    lifestyle: any;
    financial: any;
    design: any;
    usage: any;
    safety: any;
}
export interface PriorityResult {
    scores: PriorityScore[];
}
export interface PriorityScore {
    category: string;
    score: number;
    weight: number;
    reasoning?: string;
}
export interface AttributeResult {
    household: any;
    lifestyle: any;
    financial: any;
    design: any;
    usage: any;
    safety: any;
}
export declare class AttributeBuilderService {
    build(facts: Record<string, any>, ruleResults: any[]): Record<string, any>;
    private getFactValue;
    private generateHouseholdAttributes;
    private generateLifestyleAttributes;
    private generateFinancialAttributes;
    private generateDesignAttributes;
    private generateUsageAttributes;
    private generateSafetyAttributes;
    private createAttr;
    private inferMaterialPreference;
    private inferLightingPreference;
}
