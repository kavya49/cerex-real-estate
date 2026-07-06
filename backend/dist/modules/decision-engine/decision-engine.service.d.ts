import { PrismaService } from "../../prisma/prisma.service";
import { FactBuilderService } from "./fact-builder/fact-builder.service";
import { RuleEngineService } from "./rule-engine/rule-engine.service";
import { AttributeBuilderService } from "./attribute-builder/attribute-builder.service";
import { PriorityEngineService } from "./priority-engine/priority-engine.service";
import { ConstraintEngineService } from "./constraint-engine/constraint-engine.service";
export declare class DecisionEngineService {
    private prisma;
    private factBuilder;
    private ruleEngine;
    private attributeEngine;
    private priorityEngine;
    private constraintEngine;
    constructor(prisma: PrismaService, factBuilder: FactBuilderService, ruleEngine: RuleEngineService, attributeEngine: AttributeBuilderService, priorityEngine: PriorityEngineService, constraintEngine: ConstraintEngineService);
    evaluate(snapshot: any): Promise<{
        facts: import("./dto/decision-engine.dto").FactDto[];
        attributes: Record<string, any>;
        priorityScores: Record<string, any>;
        constraints: import("./constraint-engine/constraint-engine.service").ConstraintResult[];
        explainability: Record<string, any>;
        behaviourDimensions: Record<string, any>;
        conflicts: import("./rule-engine/rule-engine.service").RuleConflict[];
        metadata: {
            evaluatedAt: Date;
            snapshotId: any;
            ruleVersion: string;
            evaluationId: string | undefined;
        };
    }>;
    getEvaluation(evaluationId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        facts: import("@prisma/client/runtime/library").JsonValue;
        attributes: import("@prisma/client/runtime/library").JsonValue;
        priorityScores: import("@prisma/client/runtime/library").JsonValue;
        constraints: import("@prisma/client/runtime/library").JsonValue;
        evaluatedAt: Date;
        snapshotId: string;
    } | null>;
    getEvaluationsForSnapshot(snapshotId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        facts: import("@prisma/client/runtime/library").JsonValue;
        attributes: import("@prisma/client/runtime/library").JsonValue;
        priorityScores: import("@prisma/client/runtime/library").JsonValue;
        constraints: import("@prisma/client/runtime/library").JsonValue;
        evaluatedAt: Date;
        snapshotId: string;
    }[]>;
    private generateBehaviourDimensions;
    private generateExplainability;
}
