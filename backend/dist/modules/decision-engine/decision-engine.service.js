"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fact_builder_service_1 = require("./fact-builder/fact-builder.service");
const rule_engine_service_1 = require("./rule-engine/rule-engine.service");
const attribute_builder_service_1 = require("./attribute-builder/attribute-builder.service");
const priority_engine_service_1 = require("./priority-engine/priority-engine.service");
const constraint_engine_service_1 = require("./constraint-engine/constraint-engine.service");
const rule_registry_1 = require("./rules/rule-registry");
let DecisionEngineService = class DecisionEngineService {
    constructor(prisma, factBuilder, ruleEngine, attributeEngine, priorityEngine, constraintEngine) {
        this.prisma = prisma;
        this.factBuilder = factBuilder;
        this.ruleEngine = ruleEngine;
        this.attributeEngine = attributeEngine;
        this.priorityEngine = priorityEngine;
        this.constraintEngine = constraintEngine;
    }
    async evaluate(snapshot) {
        if (snapshot.id) {
            const stored = await this.prisma.decisionSnapshot.findUnique({
                where: { id: snapshot.id },
            });
            if (!stored) {
                throw new common_1.NotFoundException(`DecisionSnapshot ${snapshot.id} not found`);
            }
            snapshot = { ...stored, ...snapshot };
        }
        const facts = this.factBuilder.buildFacts(snapshot);
        const factsMap = facts.reduce((acc, f) => {
            acc[f.key] = f;
            return acc;
        }, {});
        const ruleResult = this.ruleEngine.execute(factsMap);
        const ruleResults = ruleResult.results;
        const ruleExecutionLog = ruleResult.ruleExecutionLog;
        const conflicts = ruleResult.conflicts || [];
        const constraints = this.constraintEngine.generateConstraints(factsMap);
        const attributes = this.attributeEngine.build(factsMap, ruleResults);
        const priorityScores = this.priorityEngine.calculatePriorityScores(factsMap, ruleResults);
        const behaviourDimensions = this.generateBehaviourDimensions(factsMap, conflicts);
        let evaluationId = null;
        if (snapshot.id) {
            const evaluation = await this.prisma.decisionEvaluation.create({
                data: {
                    snapshotId: snapshot.id,
                    facts: facts,
                    attributes: attributes,
                    priorityScores: priorityScores,
                    constraints: constraints,
                },
            });
            evaluationId = evaluation.id;
        }
        const explainability = this.generateExplainability(factsMap, ruleResults, behaviourDimensions, conflicts);
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
    async getEvaluation(evaluationId) {
        return this.prisma.decisionEvaluation.findUnique({
            where: { id: evaluationId },
        });
    }
    async getEvaluationsForSnapshot(snapshotId) {
        return this.prisma.decisionEvaluation.findMany({
            where: { snapshotId },
            orderBy: { evaluatedAt: "desc" },
        });
    }
    generateBehaviourDimensions(facts, conflicts) {
        const dimensions = {};
        for (const dim of rule_registry_1.BEHAVIOUR_DIMENSIONS) {
            let score = dim.defaultScore;
            for (const factor of dim.factors) {
                const fact = facts[factor];
                if (fact) {
                    const adjustments = {
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
                            if (val === String(fact.value) ||
                                (typeof fact.value === "boolean" && val === String(fact.value))) {
                                score = Math.round(score * 0.35 + adjustment * 0.65);
                                break;
                            }
                        }
                    }
                }
            }
            const relevantEffects = conflicts.filter((c) => c.winnerValue !== undefined && c.key === dim.key);
            for (const effect of relevantEffects) {
                if (effect.winnerValue !== undefined) {
                    score = Math.round(score * 0.3 + (Number(effect.winnerValue) || score) * 0.7);
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
    generateExplainability(facts, ruleResults, behaviourDimensions, conflicts) {
        const explainability = {
            facts: {},
            attributes: {},
            priorities: {},
            constraints: {},
            behaviours: {},
            conflicts: [],
        };
        for (const [key, fact] of Object.entries(facts)) {
            const typed = fact;
            explainability.facts[key] = {
                source: typed.source || "unknown",
                confidence: typed.confidence || 0.5,
                triggeringRules: [],
                reasoning: `Derived from ${typed.source}`,
            };
        }
        for (const result of ruleResults) {
            const target = result.type === "attribute"
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
            }
            else {
                explainability[target][result.key].triggeringRules.push(result.ruleId);
                explainability[target][result.key].confidence = Math.max(explainability[target][result.key].confidence, result.confidence || 0.8);
            }
        }
        for (const [key, dim] of Object.entries(behaviourDimensions)) {
            const typed = dim;
            explainability.behaviours[key] = {
                source: typed.source || "derived",
                confidence: typed.confidence || 0.65,
                triggeringRules: typed.triggeringRules || [],
                contributingFacts: typed.contributingFacts || [],
                reasoning: typed.reasoning || "",
            };
        }
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
};
exports.DecisionEngineService = DecisionEngineService;
exports.DecisionEngineService = DecisionEngineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fact_builder_service_1.FactBuilderService,
        rule_engine_service_1.RuleEngineService,
        attribute_builder_service_1.AttributeBuilderService,
        priority_engine_service_1.PriorityEngineService,
        constraint_engine_service_1.ConstraintEngineService])
], DecisionEngineService);
//# sourceMappingURL=decision-engine.service.js.map