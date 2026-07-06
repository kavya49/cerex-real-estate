export interface Constraint {
    id: string;
    name: string;
    type: string;
    confidence: number;
    sourceRule: string;
    applicable: boolean;
}
export interface ConstraintResult {
    id: string;
    name: string;
    confidence: number;
    sourceRules: string[];
    reason: string;
}
export declare class ConstraintEngineService {
    private readonly constraintDefinitions;
    generateConstraints(facts: Record<string, any>): ConstraintResult[];
    private checkApplicable;
    private calculateConfidence;
    private generateReason;
}
