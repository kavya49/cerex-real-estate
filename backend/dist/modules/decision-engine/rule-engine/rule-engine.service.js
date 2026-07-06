"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEngineService = void 0;
const common_1 = require("@nestjs/common");
const rule_registry_1 = require("../rules/rule-registry");
let RuleEngineService = class RuleEngineService {
    constructor() {
        this.ruleRegistryService = new rule_registry_1.RuleRegistryService();
    }
    execute(facts) {
        const results = [];
        const ruleExecutionLog = [];
        for (const rule of this.ruleRegistryService.getRules()) {
            const matched = this.evaluateConditions(rule.conditions, facts);
            const firedEffects = matched ? this.applyOverrides(rule) : [];
            ruleExecutionLog.push({
                ruleId: rule.id,
                ruleName: rule.name,
                version: rule.version,
                category: rule.category,
                severity: rule.severity,
                matched,
                firedEffects,
                timestamp: new Date(),
            });
            if (matched) {
                for (const effect of firedEffects) {
                    results.push({
                        ...effect,
                        ruleId: rule.id,
                        ruleName: rule.name,
                        ruleCategory: rule.category,
                        ruleSeverity: rule.severity,
                        rulePriority: rule.priority,
                    });
                }
            }
        }
        const severityOrder = { critical: 4, high: 3, normal: 2, low: 1 };
        results.sort((a, b) => {
            const sevDiff = (severityOrder[b.ruleSeverity] || 0) -
                (severityOrder[a.ruleSeverity] || 0);
            if (sevDiff !== 0)
                return sevDiff;
            if (b.rulePriority !== a.rulePriority)
                return b.rulePriority - a.rulePriority;
            return (b.confidence || 0.5) - (a.confidence || 0.5);
        });
        const { resolved, conflicts } = this.ruleRegistryService.resolveConflicts(results);
        return { results: resolved, ruleExecutionLog, conflicts };
    }
    applyOverrides(rule) {
        if (!rule.overrides || rule.overrides.length === 0) {
            return rule.effects;
        }
        const effects = [...rule.effects];
        for (const override of rule.overrides) {
            if (override.effects) {
                for (const effect of override.effects) {
                    const idx = effects.findIndex((e) => e.key === effect.key && e.type === effect.type);
                    if (idx >= 0) {
                        effects[idx] = { ...effects[idx], ...effect };
                    }
                    else {
                        effects.push(effect);
                    }
                }
            }
        }
        return effects;
    }
    evaluateConditions(conditions, facts) {
        return conditions.every((condition) => this.evaluateCondition(condition, facts));
    }
    evaluateCondition(condition, facts) {
        const factValue = facts[condition.fact]?.value;
        if (factValue === undefined) {
            const parts = condition.fact.split(".");
            let val = facts;
            for (const part of parts) {
                if (val === undefined || val === null)
                    return false;
                val = val[part];
                if (val?.value !== undefined)
                    val = val.value;
            }
            if (val === undefined)
                return false;
            return this.compareValues(val, condition.operator, condition.value);
        }
        return this.compareValues(factValue, condition.operator, condition.value);
    }
    compareValues(factValue, operator, conditionValue) {
        switch (operator) {
            case "eq":
                return factValue === conditionValue;
            case "neq":
                return factValue !== conditionValue;
            case "gt":
                return Number(factValue) > Number(conditionValue);
            case "gte":
                return Number(factValue) >= Number(conditionValue);
            case "lt":
                return Number(factValue) < Number(conditionValue);
            case "lte":
                return Number(factValue) <= Number(conditionValue);
            case "in":
                return (Array.isArray(conditionValue) && conditionValue.includes(factValue));
            case "contains":
                return Array.isArray(factValue) && factValue.includes(conditionValue);
            default:
                return false;
        }
    }
};
exports.RuleEngineService = RuleEngineService;
exports.RuleEngineService = RuleEngineService = __decorate([
    (0, common_1.Injectable)()
], RuleEngineService);
//# sourceMappingURL=rule-engine.service.js.map