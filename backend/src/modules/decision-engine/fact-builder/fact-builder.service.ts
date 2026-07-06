import { Injectable } from "@nestjs/common";
import { FactDto } from "../dto/decision-engine.dto";

@Injectable()
export class FactBuilderService {
  buildFacts(snapshot: any): FactDto[] {
    const answers = snapshot.answers || {};
    const facts: FactDto[] = [];

    // Household - parse from adaptive planner "household" question
    const householdSize = this.parseHouseholdSize(answers.household);
    const childrenCount = this.parseChildrenCount(
      answers.household,
      answers.children_ages,
    );
    const seniorCount = this.parseSeniorCount(answers.senior_count);
    const petCount = this.parsePetCount(answers.pet_count);

    facts.push({
      key: "householdSize",
      value: householdSize,
      type: "number",
      source: "planner.answers.household",
      confidence: 1.0,
    });

    facts.push({
      key: "childrenCount",
      value: childrenCount,
      type: "number",
      source:
        childrenCount > 0
          ? "planner.answers.household + planner.answers.children_ages"
          : "planner.answers.household",
      confidence: 1.0,
    });

    facts.push({
      key: "adultCount",
      value: Math.max(0, householdSize - childrenCount - seniorCount),
      type: "number",
      source: "derived",
      confidence: 0.9,
    });

    facts.push({
      key: "seniorCount",
      value: seniorCount,
      type: "number",
      source: seniorCount > 0 ? "planner.answers.senior_count" : "default",
      confidence: seniorCount > 0 ? 1.0 : 0.5,
    });

    facts.push({
      key: "petCount",
      value: petCount,
      type: "number",
      source: petCount > 0 ? "planner.answers.pet_count" : "default",
      confidence: petCount > 0 ? 1.0 : 0.5,
    });

    // Work - from adaptive planner "work_from_home" question
    const workFromHome = answers.work_from_home || "sometimes";
    facts.push({
      key: "workFromHome",
      value: workFromHome,
      type: "string",
      source: "planner.answers.work_from_home",
      confidence: answers.work_from_home ? 1.0 : 0.5,
    });

    facts.push({
      key: "remoteWorkDays",
      value: this.mapRemoteWorkDays(workFromHome),
      type: "number",
      source: "derived",
      confidence: 0.8,
    });

    // Timeline - from adaptive planner "move_in_timeline"
    const moveInMonths = this.parseTimeline(answers.move_in_timeline);
    facts.push({
      key: "moveInMonths",
      value: moveInMonths,
      type: "number",
      source: "planner.answers.move_in_timeline",
      confidence: answers.move_in_timeline ? 0.9 : 0.5,
    });

    // Budget - from adaptive planner "interior_budget"
    const budgetValue = answers.interior_budget
      ? parseFloat(answers.interior_budget)
      : 0;
    facts.push({
      key: "budget",
      value: {
        currency: "INR",
        amountMinorUnits: Math.round(budgetValue * 100), // budget is in rupees, convert to paise
      },
      type: "object",
      source: "planner.answers.interior_budget",
      confidence: answers.interior_budget ? 1.0 : 0.5,
    });

    const budgetTier = this.getBudgetTier(budgetValue);
    facts.push({
      key: "budgetTier",
      value: budgetTier,
      type: "string",
      source: "derived",
      confidence: 0.9,
    });

    // For backward compatibility with rules that expect interiorBudgetTier
    facts.push({
      key: "interiorBudgetTier",
      value: budgetTier,
      type: "string",
      source: "derived",
      confidence: 0.9,
    });

    // Style preferences - from adaptive planner "interior_style"
    const stylePreferences = this.parseStyles(answers.interior_style);
    facts.push({
      key: "stylePreferences",
      value: stylePreferences,
      type: "array",
      source: "planner.answers.interior_style",
      confidence: answers.interior_style ? 1.0 : 0.5,
    });

    // For rules that check preferredStyles
    facts.push({
      key: "preferredStyles",
      value: stylePreferences,
      type: "array",
      source: "planner.answers.interior_style",
      confidence: answers.interior_style ? 1.0 : 0.5,
    });

    // Purpose - for investment/first_home detection
    const purchasePurpose = answers.purpose || "First Home";
    facts.push({
      key: "purchasePurpose",
      value: purchasePurpose,
      type: "string",
      source: "planner.answers.purpose",
      confidence: answers.purpose ? 1.0 : 0.5,
    });

    // Primary lifestyle - derived from purpose and priorities
    const primaryLifestyle = this.derivePrimaryLifestyle(
      purchasePurpose,
      answers.priorities,
    );
    facts.push({
      key: "primaryLifestyle",
      value: primaryLifestyle,
      type: "string",
      source: "derived",
      confidence: 0.8,
    });

    // Preferences from priorities
    const priorities = answers.priorities || [];
    facts.push({
      key: "prefersQuiet",
      value:
        priorities.includes("privacy") || priorities.includes("natural_light"),
      type: "boolean",
      source: "planner.answers.priorities",
      confidence: 0.8,
    });

    facts.push({
      key: "prefersBalcony",
      value: priorities.includes("balcony"),
      type: "boolean",
      source: "planner.answers.priorities",
      confidence: 0.9,
    });

    facts.push({
      key: "needsHomeOffice",
      value: priorities.includes("office"),
      type: "boolean",
      source: "planner.answers.priorities",
      confidence: 0.9,
    });

    // Adaptive question responses
    const hostingFrequency = answers.hosting_frequency || "monthly";
    facts.push({
      key: "hostingFrequency",
      value: hostingFrequency,
      type: "string",
      source: "planner.answers.hosting_frequency",
      confidence: answers.hosting_frequency ? 1.0 : 0.3,
    });

    const cookingFrequency = answers.cooking_frequency || "daily";
    facts.push({
      key: "cookingFrequency",
      value: cookingFrequency,
      type: "string",
      source: "planner.answers.cooking_frequency",
      confidence: answers.cooking_frequency ? 1.0 : 0.3,
    });

    facts.push({
      key: "readingFrequency",
      value: "weekly",
      type: "string",
      source: "default",
      confidence: 0.3,
    });

    facts.push({
      key: "fitnessFrequency",
      value: "weekly",
      type: "string",
      source: "default",
      confidence: 0.3,
    });

    facts.push({
      key: "guestFrequency",
      value: hostingFrequency,
      type: "string",
      source: "planner.answers.hosting_frequency",
      confidence: answers.hosting_frequency ? 1.0 : 0.3,
    });

    // Needs - derived from household and priorities
    facts.push({
      key: "storageNeed",
      value:
        childrenCount >= 2 || priorities.includes("storage")
          ? "high"
          : "standard",
      type: "string",
      source: "derived",
      confidence: 0.7,
    });

    facts.push({
      key: "laundryNeed",
      value: householdSize >= 4 ? "high" : "standard",
      type: "string",
      source: "derived",
      confidence: 0.7,
    });

    facts.push({
      key: "officeNeed",
      value:
        workFromHome === "always"
          ? "required"
          : workFromHome === "often"
            ? "flexible"
            : "optional",
      type: "string",
      source: "derived",
      confidence: 0.8,
    });

    return facts;
  }

  private parseHouseholdSize(household: string): number {
    const sizes: Record<string, number> = {
      "Just Me": 1,
      Couple: 2,
      "Couple + Child": 3,
      Family: 4,
      "Joint Family": 6,
      "Buying as Investment": 1,
    };
    return sizes[household] || 2;
  }

  private parseChildrenCount(
    household: string,
    childrenAges: string[],
  ): number {
    if (!childrenAges || childrenAges.length === 0) {
      if (household === "Couple + Child") return 1;
      if (household === "Family") return 2;
      if (household === "Joint Family") return 3;
      return 0;
    }
    return childrenAges.length;
  }

  private parseSeniorCount(seniorCount: string): number {
    if (!seniorCount) return 0;
    if (seniorCount === "one") return 1;
    if (seniorCount === "two") return 2;
    if (seniorCount === "three_plus") return 3;
    return 0;
  }

  private parsePetCount(petCount: string): number {
    if (!petCount) return 0;
    if (petCount === "one") return 1;
    if (petCount === "two") return 2;
    if (petCount === "three_plus") return 3;
    return 0;
  }

  private mapRemoteWorkDays(workFromHome: string): number {
    switch (workFromHome) {
      case "always":
        return 5;
      case "often":
        return 3;
      case "sometimes":
        return 2;
      case "never":
        return 0;
      default:
        return 2;
    }
  }

  private parseTimeline(timeline: string): number {
    if (!timeline) return 12;
    const t = timeline.toLowerCase();
    if (t.includes("immediate")) return 0;
    if (
      t.includes("3 month") ||
      t.includes("3-month") ||
      t === "within_3_months"
    )
      return 3;
    if (t.includes("6 month") || t.includes("6-month") || t === "3_6_months")
      return 6;
    if (t.includes("1 year") || t.includes("12 month") || t === "6_12_months")
      return 12;
    if (t.includes("2 year") || t === "exploring") return 24;
    return 12;
  }

  private getBudgetTier(budget: number): string {
    if (budget >= 20000000) return "luxury"; // 2Cr+
    if (budget >= 10000000) return "premium"; // 1Cr+
    if (budget >= 5000000) return "mid"; // 50L+
    return "budget";
  }

  private parseStyles(style: string): string[] {
    if (!style) return [];
    const styleMap: Record<string, string[]> = {
      Scandinavian: ["scandinavian"],
      "Modern Luxury": ["modern", "luxury"],
      Contemporary: ["modern", "contemporary"],
      "Warm Indian": ["warm", "traditional"],
      Minimalist: ["minimalist"],
      Industrial: ["industrial"],
    };
    return styleMap[style] || [style.toLowerCase()];
  }

  private derivePrimaryLifestyle(
    purpose: string,
    priorities: string[],
  ): string {
    if (purpose === "Investment") return "investment";
    if (priorities.includes("natural_light") || priorities.includes("wellness"))
      return "wellness";
    if (
      priorities.includes("privacy") ||
      priorities.includes("low_maintenance")
    )
      return "quiet";
    if (
      priorities.includes("living_room") ||
      priorities.includes("kitchen") ||
      priorities.includes("dining")
    )
      return "social";
    return "balanced";
  }
}
