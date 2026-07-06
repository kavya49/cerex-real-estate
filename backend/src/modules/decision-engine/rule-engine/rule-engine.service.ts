import { Injectable } from "@nestjs/common";
import {
  RULE_REGISTRY,
  Rule,
  RuleCondition,
  RuleEffect,
  RuleRegistryService,
} from "../rules/rule-registry";

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

@Injectable()
export class RuleEngineService {
  private ruleRegistryService = new RuleRegistryService();

  execute(facts: Record<string, any>): RuleEngineResult {
    const results: any[] = [];
    const ruleExecutionLog: RuleExecutionLog[] = [];

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

    // Sort by severity priority, then confidence
    const severityOrder = { critical: 4, high: 3, normal: 2, low: 1 };
    results.sort((a: any, b: any) => {
      const sevDiff =
        (severityOrder[b.ruleSeverity as keyof typeof severityOrder] || 0) -
        (severityOrder[a.ruleSeverity as keyof typeof severityOrder] || 0);
      if (sevDiff !== 0) return sevDiff;
      if (b.rulePriority !== a.rulePriority)
        return b.rulePriority - a.rulePriority;
      return (b.confidence || 0.5) - (a.confidence || 0.5);
    });

    // Resolve conflicts
    const { resolved, conflicts } =
      this.ruleRegistryService.resolveConflicts(results);

    return { results: resolved, ruleExecutionLog, conflicts };
  }

  private applyOverrides(rule: Rule): RuleEffect[] {
    if (!rule.overrides || rule.overrides.length === 0) {
      return rule.effects;
    }

    // Apply overrides - last override wins
    const effects = [...rule.effects];
    for (const override of rule.overrides) {
      if (override.effects) {
        for (const effect of override.effects) {
          // Replace or add effect
          const idx = effects.findIndex(
            (e) => e.key === effect.key && e.type === effect.type,
          );
          if (idx >= 0) {
            effects[idx] = { ...effects[idx], ...effect };
          } else {
            effects.push(effect);
          }
        }
      }
    }
    return effects;
  }

  private evaluateConditions(
    conditions: RuleCondition[],
    facts: Record<string, any>,
  ): boolean {
    return conditions.every((condition) =>
      this.evaluateCondition(condition, facts),
    );
  }

  private evaluateCondition(
    condition: RuleCondition,
    facts: Record<string, any>,
  ): boolean {
    const factValue = facts[condition.fact]?.value;

    // Rule effect small helper for value extraction from complex fact objects
    if (factValue === undefined) {
      // Try nested access for facts like "interior_budget"
      const parts = condition.fact.split(".");
      let val = facts;
      for (const part of parts) {
        if (val === undefined || val === null) return false;
        val = val[part];
        if (val?.value !== undefined) val = val.value;
      }
      if (val === undefined) return false;
      return this.compareValues(val, condition.operator, condition.value);
    }

    return this.compareValues(factValue, condition.operator, condition.value);
  }

  private compareValues(
    factValue: any,
    operator: string,
    conditionValue: any,
  ): boolean {
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
        return (
          Array.isArray(conditionValue) && conditionValue.includes(factValue)
        );
      case "contains":
        return Array.isArray(factValue) && factValue.includes(conditionValue);
      default:
        return false;
    }
  }
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
