"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeBuilderService = void 0;
const common_1 = require("@nestjs/common");
let AttributeBuilderService = class AttributeBuilderService {
    build(facts, ruleResults) {
        const factsMap = facts;
        return {
            household: this.generateHouseholdAttributes(factsMap),
            lifestyle: this.generateLifestyleAttributes(factsMap),
            financial: this.generateFinancialAttributes(factsMap),
            design: this.generateDesignAttributes(factsMap),
            usage: this.generateUsageAttributes(factsMap),
            safety: this.generateSafetyAttributes(factsMap),
        };
    }
    getFactValue(facts, key) {
        return facts[key]?.value;
    }
    generateHouseholdAttributes(facts) {
        const attrs = [];
        const householdSize = facts.householdSize?.value || 1;
        const childrenCount = facts.childrenCount?.value || 0;
        const childrenPresent = facts.childrenPresent?.value || false;
        const seniorsPresent = (facts.seniorCount?.value || 0) > 0;
        attrs.push(this.createAttr("householdSize", householdSize, "number", 1.0, `Total ${householdSize} members`));
        attrs.push(this.createAttr("largeFamily", householdSize >= 5, "boolean", 0.9, householdSize >= 5 ? "5+ members" : "Standard size"));
        attrs.push(this.createAttr("childrenPresent", facts.childrenPresent?.value || false, "boolean", 1.0, facts.childrenPresent?.value ? "Children in household" : "No children"));
        attrs.push(this.createAttr("childrenCount", facts.childrenCount?.value || 0, "number", 1.0, `${facts.childrenCount?.value || 0} children`));
        attrs.push(this.createAttr("seniorsPresent", (facts.seniorCount?.value || 0) > 0, "boolean", 1.0, (facts.seniorCount?.value || 0) > 0 ? "Seniors present" : "No seniors"));
        return attrs;
    }
    generateLifestyleAttributes(facts) {
        const attrs = [];
        const workFromHome = facts.workFromHome?.value || "hybrid";
        const primaryLifestyle = facts.primaryLifestyle?.value || "balanced";
        const moveInMonths = facts.moveInMonths?.value || 6;
        const prefersQuiet = facts.prefersQuiet?.value || false;
        attrs.push(this.createAttr("remoteWorkIntensity", workFromHome === "full-time"
            ? "high"
            : workFromHome === "hybrid"
                ? "medium"
                : "low", "string", 0.9, `Work from home: ${workFromHome}`));
        attrs.push(this.createAttr("entertainmentIntensity", facts.primaryLifestyle?.value === "social"
            ? "high"
            : primaryLifestyle === "wellness"
                ? "low"
                : "medium", "string", 0.8, `Lifestyle: ${primaryLifestyle}`));
        attrs.push(this.createAttr("cookingIntensity", "medium", "string", 0.7, "Default assumption"));
        attrs.push(this.createAttr("readingInterest", primaryLifestyle === "quiet" ? "high" : "medium", "string", 0.6, "Inferred from lifestyle"));
        attrs.push(this.createAttr("fitnessInterest", primaryLifestyle === "wellness" ? "high" : "medium", "string", 0.6, "Inferred from lifestyle"));
        attrs.push(this.createAttr("moveInUrgency", (facts.moveInMonths?.value || 6) <= 3
            ? "high"
            : (facts.moveInMonths?.value || 6) <= 12
                ? "medium"
                : "low", "string", 0.8, `${facts.moveInMonths?.value || 6} months`));
        const prefsQuiet = facts.prefersQuiet?.value || false;
        attrs.push(this.createAttr("prefersQuiet", prefsQuiet, "boolean", 0.9, prefsQuiet ? "Prefers quiet environment" : "No quiet preference"));
        return attrs;
    }
    generateFinancialAttributes(facts) {
        const attrs = [];
        const budgetMinor = facts.budgetMinorUnits?.value || 0;
        const budgetLakhs = facts.budgetLakhs?.value || 0;
        const budgetExplicit = facts.budgetExplicit?.value || false;
        const budgetTier = budgetLakhs >= 30
            ? "luxury"
            : budgetLakhs >= 15
                ? "premium"
                : budgetLakhs >= 8
                    ? "mid"
                    : "budget";
        const purchaseUrgency = (facts.moveInMonths?.value || 6) <= 3
            ? "high"
            : (facts.moveInMonths?.value || 6) <= 12
                ? "medium"
                : "low";
        const financingSensitivity = budgetLakhs < 10 ? "high" : budgetLakhs < 20 ? "medium" : "low";
        attrs.push(this.createAttr("interiorBudgetTier", budgetTier, "string", 0.9, `\u20B9${budgetLakhs}L budget`));
        attrs.push(this.createAttr("purchaseUrgency", purchaseUrgency, "string", 0.8, `${facts.moveInMonths?.value || 6} months`));
        attrs.push(this.createAttr("financingSensitivity", financingSensitivity, "string", 0.7, "Budget-based inference"));
        attrs.push(this.createAttr("budgetExplicit", budgetExplicit, "boolean", 1.0, budgetExplicit ? "Budget provided" : "Budget estimated"));
        return attrs;
    }
    generateDesignAttributes(facts) {
        const attrs = [];
        const preferredStyle = facts.preferredStyle?.value || "modern";
        const styleTokens = Array.isArray(facts.preferredStyles?.value)
            ? facts.preferredStyles?.value
            : [facts.preferredStyle?.value];
        const colorPalette = facts.colorPalette?.value || "neutral";
        const prefersBalcony = facts.prefersBalcony?.value || false;
        attrs.push(this.createAttr("preferredStyles", Array.isArray(facts.preferredStyles?.value)
            ? facts.preferredStyles?.value
            : [facts.preferredStyle?.value], "array", 0.9, `Styles: ${Array.isArray(facts.preferredStyles?.value) ? facts.preferredStyles?.value.join(", ") : facts.preferredStyle?.value}`));
        attrs.push(this.createAttr("materialPreference", this.inferMaterialPreference(Array.isArray(facts.preferredStyles?.value)
            ? facts.preferredStyles?.value
            : [facts.preferredStyle?.value]), "string", 0.7, "Inferred from styles"));
        attrs.push(this.createAttr("lightingPreference", this.inferLightingPreference(Array.isArray(facts.preferredStyles?.value)
            ? facts.preferredStyles?.value
            : [facts.preferredStyle?.value]), "string", 0.7, "Inferred from styles"));
        attrs.push(this.createAttr("opennessPreference", styleTokens.includes("modern") ? "open" : "defined", "string", 0.7, "Inferred from styles"));
        attrs.push(this.createAttr("colorPalette", facts.colorPalette?.value || "neutral", "string", 0.8, "Normalized design palette"));
        attrs.push(this.createAttr("prefersBalcony", prefersBalcony, "boolean", 0.8, prefersBalcony ? "Balcony preferred" : "No balcony preference"));
        return attrs;
    }
    generateUsageAttributes(facts) {
        const attrs = [];
        const officeReq = facts.workFromHome?.value === "full-time";
        const storageReq = (facts.childrenCount?.value || 0) > 1;
        const diningReq = (facts.childrenCount?.value || 0) > 2;
        const utilityReq = (facts.childrenCount?.value || 0) > 0;
        attrs.push(this.createAttr("officeRequirement", officeReq, "boolean", 0.9, officeReq ? "WFH requires office" : "No office needed"));
        attrs.push(this.createAttr("storageRequirement", storageReq ? "high" : "standard", "string", 0.8, storageReq ? "Large family needs storage" : "Standard storage"));
        attrs.push(this.createAttr("diningRequirement", diningReq ? "large" : "standard", "string", 0.8, diningReq ? "Large family dining" : "Standard dining"));
        attrs.push(this.createAttr("utilityRequirement", utilityReq ? "enhanced" : "standard", "string", 0.7, utilityReq ? "Family needs utility" : "Standard utility"));
        return attrs;
    }
    generateSafetyAttributes(facts) {
        const attrs = [];
        const childrenPresent = facts.childrenPresent?.value || false;
        const seniorCount = facts.seniorCount?.value || 0;
        const petCount = facts.petCount?.value || 0;
        attrs.push(this.createAttr("childSafetyRequired", facts.childrenPresent?.value || false, "boolean", 0.95, facts.childrenPresent?.value ? "Children in household" : "No children"));
        attrs.push(this.createAttr("seniorAccessibilityRequired", (facts.seniorCount?.value || 0) > 0, "boolean", 0.9, (facts.seniorCount?.value || 0) > 0
            ? `${facts.seniorCount?.value} senior(s)`
            : "No seniors"));
        attrs.push(this.createAttr("petSafetyRequired", (facts.petCount?.value || 0) > 0, "boolean", 0.8, (facts.petCount?.value || 0) > 0
            ? `${facts.petCount?.value} pet(s)`
            : "No pets"));
        return attrs;
    }
    createAttr(key, value, type, confidence, reasoning) {
        return { key, value, type, confidence, reasoning };
    }
    inferMaterialPreference(styles) {
        if (styles.includes("luxury"))
            return "premium-natural";
        if (styles.includes("modern"))
            return "engineered-composites";
        if (styles.includes("classic"))
            return "solid-wood";
        if (styles.includes("minimalist") || styles.includes("scandinavian"))
            return "light-wood";
        if (styles.includes("warm"))
            return "warm-wood";
        return "mixed";
    }
    inferLightingPreference(styles) {
        if (styles.includes("modern") || styles.includes("minimalist"))
            return "bright-indirect";
        if (styles.includes("classic") || styles.includes("warm"))
            return "warm-ambient";
        if (styles.includes("wellness"))
            return "circadian-tuned";
        return "balanced";
    }
};
exports.AttributeBuilderService = AttributeBuilderService;
exports.AttributeBuilderService = AttributeBuilderService = __decorate([
    (0, common_1.Injectable)()
], AttributeBuilderService);
//# sourceMappingURL=attribute-builder.service.js.map