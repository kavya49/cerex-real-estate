export interface RuleExecutionLog {
    ruleId: string;
    ruleName: string;
    version: number;
    category: string;
    severity: string;
    matched: boolean;
    firedEffects: any[];
    timestamp: Date;
}
export interface RuleConflict {
    key: string;
    type: string;
    winnerRuleId: string;
    loserRuleId: string;
    winnerValue: any;
    loserValue: any;
    resolutionReason: string;
}
export interface RuleEngineResult {
    results: any[];
    ruleExecutionLog: RuleExecutionLog[];
    conflicts: RuleConflict[];
}
export declare class RuleEngineService {
    private ruleRegistryService;
    execute(facts: Record<string, any>): RuleEngineResult;
    private applyOverrides;
    private evaluateConditions;
    private evaluateCondition;
    private compareValues;
}
export interface RuleConflict {
    key: string;
    type: string;
    winnerRuleId: string;
    loserRuleId: string;
    winnerValue: any;
    loserValue: any;
    resolutionReason: string;
}
