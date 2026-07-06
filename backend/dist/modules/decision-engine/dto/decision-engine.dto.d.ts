export declare class FactDto {
    key: string;
    value: any;
    type: string;
    source: string;
    confidence: number;
}
export declare class AttributeDto {
    key: string;
    value: any;
    type: string;
    confidence: number;
    reasoning?: string;
}
export declare class PriorityScoreDto {
    category: string;
    score: number;
    weight: number;
    reasoning?: string;
}
export declare class ConstraintDto {
    id: string;
    name: string;
    confidence: number;
    sourceRules?: string[];
    reason: string;
}
export declare class DecisionSnapshotDto {
    buyerId: string;
    projectId: string;
    sessionId?: string;
    facts: Record<string, any>;
    attributes: Record<string, any>;
    priorityScores: Record<string, any>;
    constraints: Record<string, any>;
    metadata?: Record<string, any>;
    ruleExecutionLog?: Record<string, any>;
}
export declare class EvaluateDecisionRequestDto {
    snapshot: DecisionSnapshotDto;
}
export declare class EvaluateDecisionResponseDto {
    facts: FactDto[];
    attributes: any;
    priorityScores: Record<string, any>;
    constraints: ConstraintDto[];
    metadata: {
        evaluatedAt: Date;
        snapshotId: string;
        ruleVersion: string;
        evaluationId?: string;
    };
    explainability?: any;
    behaviourDimensions?: any;
    conflicts?: any[];
}
