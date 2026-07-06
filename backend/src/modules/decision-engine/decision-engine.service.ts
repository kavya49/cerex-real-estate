import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { FactBuilderService } from "./fact-builder/fact-builder.service";
import { RuleEngineService } from "./rule-engine/rule-engine.service";
import { AttributeBuilderService } from "./attribute-builder/attribute-builder.service";
import { PriorityEngineService } from "./priority-engine/priority-engine.service";
import { ConstraintEngineService } from "./constraint-engine/constraint-engine.service";
import { BEHAVIOUR_DIMENSIONS, RuleConflict } from "./rules/rule-registry";

@Injectable()
export class DecisionEngineService {
  constructor(
    private prisma: PrismaService,
    private factBuilder: FactBuilderService,
    private ruleEngine: RuleEngineService,
    private attributeEngine: AttributeBuilderService,
    private priorityEngine: PriorityEngineService,
    private constraintEngine: ConstraintEngineService,
  ) {}

  async evaluate(snapshot: any) {
    if (snapshot.id) {
      const stored = await this.prisma.decisionSnapshot.findUnique({
        where: { id: snapshot.id },
      });
      if (!stored) {
        throw new NotFoundException(
          `DecisionSnapshot ${snapshot.id} not found`,
        );
      }
      snapshot = { ...stored, ...snapshot };
    }

    const facts = this.factBuilder.buildFacts(snapshot);

    const factsMap = facts.reduce((acc: Record<string, any>, f: any) => {
      acc[f.key] = f;
      return acc;
    }, {});

    const ruleResult = this.ruleEngine.execute(factsMap);
    const ruleResults = ruleResult.results;
    const ruleExecutionLog = ruleResult.ruleExecutionLog;
    const conflicts = ruleResult.conflicts || [];

    const constraints = this.constraintEngine.generateConstraints(factsMap);
    const attributes = this.attributeEngine.build(factsMap, ruleResults);
    const priorityScores = this.priorityEngine.calculatePriorityScores(
      factsMap,
      ruleResults,
    );

    // Generate behaviour dimensions
    const behaviourDimensions = this.generateBehaviourDimensions(
      factsMap,
      conflicts,
    );

    let evaluationId: string | null = null;
    if (snapshot.id) {
      const evaluation = await this.prisma.decisionEvaluation.create({
        data: {
          snapshotId: snapshot.id,
          facts: facts as any,
          attributes: attributes as any,
          priorityScores: priorityScores as any,
          constraints: constraints as any,
        },
      });
      evaluationId = evaluation.id;
    }

    const explainability = this.generateExplainability(
      factsMap,
      ruleResults,
      behaviourDimensions,
      conflicts,
    );

    return {
      facts,
      attributes,
      priorityScores,
      constraints,
      explainability,
      behaviourDimensions,
      conflicts,
      metadata: {
        evaluatedAt: new Date(),
        snapshotId: snapshot.id || "unknown",
        ruleVersion: "1.0",
        evaluationId: evaluationId || undefined,
      },
    };
  }

  async getEvaluation(evaluationId: string) {
    return this.prisma.decisionEvaluation.findUnique({
      where: { id: evaluationId },
    });
  }

  async getEvaluationsForSnapshot(snapshotId: string) {
    return this.prisma.decisionEvaluation.findMany({
      where: { snapshotId },
      orderBy: { evaluatedAt: "desc" },
    });
  }

  private generateBehaviourDimensions(
    facts: Record<string, any>,
    conflicts: RuleConflict[],
  ): Record<string, any> {
    const dimensions: Record<string, any> = {};

    for (const dim of BEHAVIOUR_DIMENSIONS) {
      let score = dim.defaultScore;

      // Calculate based on contributing factors
      for (const factor of dim.factors) {
        const fact = facts[factor];
        if (fact) {
          const adjustments: Record<string, Record<string, number>> = {
            privacyOrientation: {
              true: 85,
              false: 40,
              quiet: 88,
              social: 35,
              wellness: 60,
              balanced: 50,
            },
            hostingOrientation: {
              true: 88,
              false: 35,
              social: 88,
              quiet: 40,
              wellness: 45,
              balanced: 50,
            },
            luxuryOrientation: {
              luxury: 85,
              premium: 65,
              mid: 45,
              budget: 30,
              scandinavian: 55,
            },
            comfortOrientation: {
              luxury: 70,
              premium: 72,
              mid: 68,
              budget: 60,
              balanced: 50,
            },
            maintenanceOrientation: {
              budget: 82,
              mid: 68,
              premium: 50,
              luxury: 40,
            },
            futurePlanning: {
              high: 85,
              medium: 65,
              low: 40,
              Investment: 85,
              "First Home": 72,
              Upgrading: 60,
            },
            wellnessOrientation: {
              wellness: 85,
              balanced: 65,
              social: 45,
              quiet: 58,
            },
            technologyAffinity: {
              luxury: 72,
              premium: 68,
              mid: 58,
              budget: 48,
            },
            familyOrientation: {
              luxury: 55,
              premium: 62,
              mid: 68,
              budget: 75,
              Investment: 35,
              "First Home": 65,
            },
          };

          const dimAdjustments = adjustments[dim.key];
          if (dimAdjustments && fact.value !== undefined) {
            for (const [val, adjustment] of Object.entries(dimAdjustments)) {
              if (
                val === String(fact.value) ||
                (typeof fact.value === "boolean" && val === String(fact.value))
              ) {
                score = Math.round(score * 0.35 + adjustment * 0.65);
                break;
              }
            }
          }
        }
      }

      // Apply effect-based adjustments from rule results
      const relevantEffects = conflicts.filter(
        (c) => c.winnerValue !== undefined && c.key === dim.key,
      );

      for (const effect of relevantEffects) {
        if (effect.winnerValue !== undefined) {
          score = Math.round(
            score * 0.3 + (Number(effect.winnerValue) || score) * 0.7,
          );
        }
      }

      score = Math.max(0, Math.min(100, Math.round(score)));

      dimensions[dim.key] = {
        score,
        confidence: 0.65 + dim.factors.filter((f) => facts[f]).length * 0.07,
        source: "facts + rules",
        reasoning: `${dim.name}: based on ${dim.factors.join(", ")}`,
        triggeringRules: [],
        contributingFacts: dim.factors.filter((f) => facts[f]),
      };
    }

    return dimensions;
  }

  private generateExplainability(
    facts: Record<string, any>,
    ruleResults: any[],
    behaviourDimensions: Record<string, any>,
    conflicts: RuleConflict[],
  ): Record<string, any> {
    const explainability: Record<string, any> = {
      facts: {} as Record<string, any>,
      attributes: {} as Record<string, any>,
      priorities: {} as Record<string, any>,
      constraints: {} as Record<string, any>,
      behaviours: {} as Record<string, any>,
      conflicts: [] as any[],
    };

    // Fact explainability
    for (const [key, fact] of Object.entries(facts)) {
      const typed = fact as any;
      explainability.facts[key] = {
        source: typed.source || "unknown",
        confidence: typed.confidence || 0.5,
        triggeringRules: [],
        reasoning: `Derived from ${typed.source}`,
      };
    }

    // Rule-based explainability
    for (const result of ruleResults) {
      const target =
        result.type === "attribute"
          ? "attributes"
          : result.type === "priority"
            ? "priorities"
            : result.type === "constraint"
              ? "constraints"
              : result.type === "behaviour"
                ? "behaviours"
                : "attributes";

      if (!explainability[target][result.key]) {
        explainability[target][result.key] = {
          source: result.ruleId,
          confidence: result.confidence || 0.8,
          triggeringRules: [result.ruleId],
          reasoning: `Applied ${result.ruleId} (severity: ${result.ruleSeverity}, priority: ${result.rulePriority})`,
        };
      } else {
        explainability[target][result.key].triggeringRules.push(result.ruleId);
        explainability[target][result.key].confidence = Math.max(
          explainability[target][result.key].confidence,
          result.confidence || 0.8,
        );
      }
    }

    // Behaviour explainability
    for (const [key, dim] of Object.entries(behaviourDimensions)) {
      const typed = dim as any;
      explainability.behaviours[key] = {
        source: typed.source || "derived",
        confidence: typed.confidence || 0.65,
        triggeringRules: typed.triggeringRules || [],
        contributingFacts: typed.contributingFacts || [],
        reasoning: typed.reasoning || "",
      };
    }

    // Conflict explainability
    if (conflicts.length > 0) {
      explainability["conflicts"] = conflicts.map((c) => ({
        field: c.key,
        winnerRuleId: c.winnerRuleId,
        loserRuleId: c.loserRuleId,
        winnerValue: c.winnerValue,
        loserValue: c.loserValue,
        resolutionReason: c.resolutionReason,
      }));
    }

    return explainability;
  }
}
