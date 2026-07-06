import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { MAPPING_REGISTRY } from "./rules/mapping-registry";
import { NormalizePlannerRequestDto } from "./dto/normalization.dto";

@Injectable()
export class NormalizationService {
  private readonly logger = new Logger(NormalizationService.name);

  constructor(private prisma: PrismaService) {}

  async normalize(request: NormalizePlannerRequestDto) {
    const { answers, projectId, buyerId, sessionId } = request;
    const warnings: string[] = [];

    const household = this.normalizeHousehold(answers, warnings);
    const lifestyle = this.normalizeLifestyle(answers, warnings);
    const design = this.normalizeDesign(answers, warnings);
    const financial = this.normalizeFinancial(answers, warnings);
    const preferences = this.normalizePreferences(answers, warnings);

    const result = {
      household,
      lifestyle,
      design,
      financial,
      preferences,
      rawAnswers: answers,
      version: 1,
      normalizedAt: new Date(),
    };

    // Build metadata with confidence and source per top-level category
    const metadata = {
      household: { confidence: 1.0, source: "normalization" },
      lifestyle: { confidence: 1.0, source: "normalization" },
      design: { confidence: 1.0, source: "normalization" },
      financial: { confidence: 1.0, source: "normalization" },
      preferences: { confidence: 1.0, source: "normalization" },
    };

    // Build facts from normalized data
    const facts = this.buildFacts(result);
    const attributes = this.buildAttributes(result);
    const priorityScores = this.buildPriorityScores(result);
    const constraints = this.buildConstraints(result);

    // Persist DecisionSnapshot if we have buyerId and projectId
    if (buyerId && projectId) {
      const existing = await this.prisma.decisionSnapshot.findFirst({
        where: {
          buyerId,
          projectId,
          sessionId: sessionId || null,
        },
      });

      const snapshotData = {
        buyerId,
        projectId,
        sessionId: sessionId || null,
        plannerVersion: "1.0",
        normalizationVersion: "1.0",
        questionnaireVersion: "1.0",
        decisionEngineVersion: "1.0",
        generatedAt: new Date(),
        facts: facts as any,
        attributes: attributes as any,
        priorityScores: priorityScores as any,
        constraints: constraints as any,
        metadata,
        ruleExecutionLog: [],
      };

      if (existing) {
        await this.prisma.decisionSnapshot.update({
          where: { id: existing.id },
          data: {
            ...snapshotData,
          },
        });
      } else {
        await this.prisma.decisionSnapshot.create({
          data: snapshotData,
        });
      }
    }

    return {
      data: result,
      success: true,
      warnings: warnings.length ? warnings : undefined,
    };
  }

  private buildFacts(result: any) {
    return {
      householdSize: {
        value: result.household.total,
        source: "normalization",
        confidence: 1.0,
      },
      childrenCount: {
        value: result.household.children,
        source: "normalization",
        confidence: 1.0,
      },
      adultsCount: {
        value: result.household.adults,
        source: "normalization",
        confidence: 1.0,
      },
      hasChildren: {
        value: result.household.hasChildren,
        source: "normalization",
        confidence: 1.0,
      },
      workFromHome: {
        value: result.lifestyle.workFromHome,
        source: "normalization",
        confidence: 1.0,
      },
      moveInMonths: {
        value: result.lifestyle.moveInMonths,
        source: "normalization",
        confidence: 1.0,
      },
      primaryLifestyle: {
        value: result.lifestyle.primary,
        source: "normalization",
        confidence: 1.0,
      },
      prefersQuiet: {
        value: result.lifestyle.prefersQuiet,
        source: "normalization",
        confidence: 1.0,
      },
      preferredStyle: {
        value: result.design.style,
        source: "normalization",
        confidence: 1.0,
      },
      colorPalette: {
        value: result.design.colorPalette,
        source: "normalization",
        confidence: 0.8,
      },
      budgetMinorUnits: {
        value: result.financial.budgetMinorUnits,
        source: "normalization",
        confidence: 1.0,
      },
      budgetExplicit: {
        value: result.financial.explicit,
        source: "normalization",
        confidence: 1.0,
      },
      prefersBalcony: {
        value: result.preferences.prefersBalcony,
        source: "normalization",
        confidence: 0.9,
      },
      needsHomeOffice: {
        value: result.preferences.needsHomeOffice,
        source: "normalization",
        confidence: 0.9,
      },
      preferredFloorLevel: {
        value: result.preferences.preferredFloorLevel,
        source: "normalization",
        confidence: 0.8,
      },
    };
  }

  private buildAttributes(result: any) {
    return {
      householdSize: {
        value: result.household.total,
        confidence: 1.0,
        source: "normalization",
      },
      largeFamily: {
        value: result.household.total >= 5,
        confidence: 0.9,
        source: "normalization",
      },
      childrenPresent: {
        value: result.household.hasChildren,
        confidence: 1.0,
        source: "normalization",
      },
      childrenCount: {
        value: result.household.children,
        confidence: 1.0,
        source: "normalization",
      },
      remoteWorkIntensity: {
        value:
          result.lifestyle.workFromHome === "full-time"
            ? "high"
            : result.lifestyle.workFromHome === "hybrid"
              ? "medium"
              : "low",
        confidence: 0.9,
        source: "normalization",
      },
      moveInUrgency: {
        value:
          result.lifestyle.moveInMonths <= 3
            ? "high"
            : result.lifestyle.moveInMonths <= 12
              ? "medium"
              : "low",
        confidence: 0.8,
        source: "normalization",
      },
      interiorBudgetTier: {
        value:
          result.financial.budgetMinorUnits >= 3000000
            ? "luxury"
            : result.financial.budgetMinorUnits >= 1500000
              ? "premium"
              : result.financial.budgetMinorUnits >= 800000
                ? "mid"
                : "budget",
        confidence: 0.9,
        source: "normalization",
      },
      preferredStyles: {
        value: result.design.style,
        confidence: 0.9,
        source: "normalization",
      },
      materialPreference: {
        value: this.inferMaterialPreference(result.design.style),
        confidence: 0.7,
        source: "derived",
      },
      lightingPreference: {
        value: this.inferLightingPreference(result.design.style),
        confidence: 0.7,
        source: "derived",
      },
      prefersBalcony: {
        value: result.preferences.prefersBalcony,
        confidence: 0.8,
        source: "normalization",
      },
      officeRequirement: {
        value: result.preferences.needsHomeOffice,
        confidence: 0.9,
        source: "normalization",
      },
      storageRequirement: {
        value: result.household.children > 1 ? "high" : "standard",
        confidence: 0.8,
        source: "normalization",
      },
      childSafetyRequired: {
        value: result.household.hasChildren,
        confidence: 0.95,
        source: "normalization",
      },
    };
  }

  private buildPriorityScores(result: any) {
    return {
      office: {
        score: result.preferences.needsHomeOffice ? 85 : 30,
        weight: 1.0,
        confidence: 0.8,
      },
      kitchen: { score: 60, weight: 0.9, confidence: 0.7 },
      storage: {
        score: result.household.children > 1 ? 80 : 50,
        weight: 0.85,
        confidence: 0.8,
      },
      dining: {
        score:
          result.household.children > 2
            ? 85
            : result.household.total > 4
              ? 70
              : 50,
        weight: 0.8,
        confidence: 0.7,
      },
      livingRoom: {
        score:
          result.household.total > 4
            ? 80
            : result.household.total > 2
              ? 70
              : 60,
        weight: 0.75,
        confidence: 0.8,
      },
      balcony: {
        score: result.preferences.prefersBalcony ? 80 : 50,
        weight: 0.7,
        confidence: 0.8,
      },
      utility: { score: 60, weight: 0.65, confidence: 0.6 },
      safety: {
        score: result.household.hasChildren ? 70 : 40,
        weight: 1.0,
        confidence: 0.9,
      },
      accessibility: { score: 40, weight: 0.9, confidence: 0.7 },
    };
  }

  private buildConstraints(result: any) {
    const constraints = [];

    if (result.preferences.needsHomeOffice) {
      constraints.push({
        id: "DedicatedOffice",
        name: "Dedicated Office",
        confidence: 0.9,
        sourceRules: ["normalization"],
        reason: "Work from home requires office space",
      });
    }

    if (result.household.hasChildren) {
      constraints.push({
        id: "ChildSafeLayout",
        name: "Child Safe Layout",
        confidence: 0.95,
        sourceRules: ["normalization"],
        reason: "Children in household require safety features",
      });
    }

    if (result.household.children > 1) {
      constraints.push({
        id: "HighStorage",
        name: "High Storage Capacity",
        confidence: 0.9,
        sourceRules: ["normalization"],
        reason: "Large family needs extensive storage",
      });
    }

    if (result.household.total >= 5) {
      constraints.push({
        id: "LargeDining",
        name: "Large Dining Area",
        confidence: 0.9,
        sourceRules: ["normalization"],
        reason: "Large household needs large dining space",
      });
    }

    constraints.push({
      id: "NaturalLightingRequired",
      name: "Natural Lighting Required",
      confidence: 0.85,
      sourceRules: ["normalization"],
      reason: "All homes require adequate natural lighting",
    });

    return constraints;
  }

  private inferMaterialPreference(styles: string[]): string {
    if (styles.includes("luxury")) return "premium-natural";
    if (styles.includes("modern")) return "engineered-composites";
    if (styles.includes("classic")) return "solid-wood";
    if (styles.includes("minimalist") || styles.includes("scandinavian"))
      return "light-wood";
    if (styles.includes("warm")) return "warm-wood";
    return "mixed";
  }

  private inferLightingPreference(styles: string[]): string {
    if (styles.includes("modern") || styles.includes("minimalist"))
      return "bright-indirect";
    if (styles.includes("classic") || styles.includes("warm"))
      return "warm-ambient";
    if (styles.includes("wellness")) return "circadian-tuned";
    return "balanced";
  }

  private normalizeHousehold(answers: Record<string, any>, warnings: string[]) {
    const familySizeRaw = answers.familySize;
    const childrenRaw = answers.children;

    const adults = MAPPING_REGISTRY.household.familySize.map(familySizeRaw);
    const children = MAPPING_REGISTRY.household.children.map(childrenRaw);

    if (typeof familySizeRaw !== "string")
      warnings.push("familySize not a string");
    if (typeof childrenRaw !== "string") warnings.push("children not a string");

    return {
      adults,
      children,
      total: adults + children,
      hasChildren: children > 0,
      childrenAgeRanges: [], // not provided in current answers
    };
  }

  private normalizeLifestyle(answers: Record<string, any>, warnings: string[]) {
    const workFromHomeRaw = answers.workFromHome;
    const lifestyleRaw = answers.lifestyle;
    const timelineRaw = answers.timeline;

    const workFromHome =
      MAPPING_REGISTRY.lifestyle.workFromHome.map(workFromHomeRaw);
    const primary = MAPPING_REGISTRY.lifestyle.lifestyle.map(lifestyleRaw);
    const moveInMonths = MAPPING_REGISTRY.lifestyle.timeline.map(timelineRaw);

    if (typeof workFromHomeRaw !== "string")
      warnings.push("workFromHome not a string");
    if (typeof lifestyleRaw !== "string")
      warnings.push("lifestyle not a string");
    if (typeof timelineRaw !== "string") warnings.push("timeline not a string");

    return {
      primary,
      workFromHome,
      moveInMonths,
      prefersQuiet: primary === "quiet",
    };
  }

  private normalizeDesign(answers: Record<string, any>, warnings: string[]) {
    const styleRaw = answers.style;
    const style = MAPPING_REGISTRY.design.style.map(styleRaw); // now returns string[]

    if (typeof styleRaw !== "string") warnings.push("style not a string");

    return {
      style,
      explicit: typeof styleRaw === "string",
      colorPalette: this.inferColorPalette(style),
    };
  }

  private inferColorPalette(styleTokens: string[]): string {
    // simple inference based on first token
    const primary = styleTokens[0];
    switch (primary) {
      case "modern":
      case "luxury":
        return "neutral-gold";
      case "classic":
        return "warm-neutrals";
      case "minimalist":
        return "cool-neutrals";
      case "warm":
        return "warm-earth";
      default:
        return "neutral";
    }
  }

  private normalizeFinancial(answers: Record<string, any>, warnings: string[]) {
    const budgetRaw = answers.budget;
    const budgetMinorUnits = MAPPING_REGISTRY.financial.budget.map(budgetRaw);

    if (typeof budgetRaw !== "number") warnings.push("budget not a number");

    return {
      budgetMinorUnits,
      currency: "INR",
      explicit: typeof budgetRaw === "number",
    };
  }

  private normalizePreferences(
    answers: Record<string, any>,
    _warnings: string[],
  ) {
    const lifestyleRaw = answers.lifestyle;
    const workFromHomeRaw = answers.workFromHome;
    // childrenRaw no longer used for pets

    const prefersBalcony =
      MAPPING_REGISTRY.preferences.lifestyle.balcony(lifestyleRaw);
    const needsHomeOffice =
      MAPPING_REGISTRY.preferences.lifestyle.homeOffice(workFromHomeRaw);
    const preferredFloorLevel =
      MAPPING_REGISTRY.preferences.style.floorLevel(lifestyleRaw);

    return {
      prefersBalcony,
      needsHomeOffice,
      preferredFloorLevel,
    };
  }
}
