"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityEngineService = void 0;
const common_1 = require("@nestjs/common");
let PriorityEngineService = class PriorityEngineService {
    constructor() {
        this.weights = {
            office: 1.0,
            kitchen: 0.9,
            storage: 0.85,
            dining: 0.8,
            livingRoom: 0.75,
            balcony: 0.7,
            utility: 0.65,
            safety: 1.0,
            accessibility: 0.9,
        };
    }
    calculatePriorityScores(facts, attributes) {
        const scores = {};
        const wfh = facts.workFromHome?.value;
        const officeAttr = attributes.requiresOffice?.value ?? false;
        const officeConfidence = attributes.requiresOffice?.confidence ?? 0.5;
        scores.office = this.calculateScore("office", {
            base: wfh === "full-time" ? 85 : wfh === "hybrid" ? 60 : 20,
            modifier: officeAttr ? 1.2 : 0.5,
            confidence: officeConfidence,
        });
        const cookingInterest = attributes.cookingIntensity?.value ?? "low";
        const childrenCount = facts.childrenCount?.value ?? 0;
        scores.kitchen = this.calculateScore("kitchen", {
            base: cookingInterest === "high"
                ? 80
                : cookingInterest === "medium"
                    ? 60
                    : 40,
            modifier: childrenCount > 2 ? 1.15 : childrenCount > 0 ? 1.1 : 1.0,
            confidence: 0.8,
        });
        const highStorage = attributes.requiresStorage?.value ?? false;
        const childrenCount2 = facts.childrenCount?.value ?? 0;
        scores.storage = this.calculateScore("storage", {
            base: highStorage ? 80 : 50,
            modifier: childrenCount2 > 1 ? 1.2 : 1.0,
            confidence: attributes.requiresStorage?.confidence ?? 0.75,
        });
        const largeDining = attributes.requiresDining?.value ?? false;
        const childrenCount3 = facts.childrenCount?.value ?? 0;
        scores.dining = this.calculateScore("dining", {
            base: largeDining ? 85 : childrenCount3 > 0 ? 65 : 50,
            modifier: largeDining ? 1.2 : childrenCount3 > 0 ? 1.1 : 1.0,
            confidence: attributes.requiresDining?.confidence ?? 0.8,
        });
        const householdSize = facts.householdSize?.value ?? 0;
        scores.livingRoom = this.calculateScore("livingRoom", {
            base: householdSize > 4 ? 80 : householdSize > 2 ? 70 : 60,
            modifier: householdSize > 4 ? 1.1 : 1.0,
            confidence: 0.8,
        });
        const prefersBalcony = facts.prefersBalcony?.value ?? false;
        const lifestyle = facts.primaryLifestyle?.value;
        scores.balcony = this.calculateScore("balcony", {
            base: prefersBalcony ? 80 : lifestyle === "wellness" ? 70 : 50,
            modifier: prefersBalcony ? 1.2 : lifestyle === "wellness" ? 1.1 : 1.0,
            confidence: 0.8,
        });
        scores.utility = this.calculateScore("utility", {
            base: 60,
            modifier: 1.0,
            confidence: 0.6,
        });
        const childSafety = attributes.childSafetyRequired?.value ?? false;
        const seniorAccessibility = attributes.seniorAccessibilityRequired?.value ?? false;
        const petSafety = attributes.petSafetyRequired?.value ?? false;
        scores.safety = this.calculateScore("safety", {
            base: (childSafety ? 35 : 0) +
                (seniorAccessibility ? 35 : 0) +
                (petSafety ? 20 : 0),
            modifier: childSafety || seniorAccessibility ? 1.2 : 1.0,
            confidence: 0.9,
        });
        const seniorAccess = attributes.seniorAccessibilityRequired?.value ?? false;
        scores.accessibility = this.calculateScore("accessibility", {
            base: seniorAccess ? 85 : 40,
            modifier: seniorAccess ? 1.2 : 1.0,
            confidence: attributes.seniorAccessibilityRequired?.confidence ?? 0.9,
        });
        return scores;
    }
    calculateScore(category, params) {
        const { base, modifier, confidence } = params;
        const rawScore = Math.min(100, Math.max(0, base * modifier));
        const weightedScore = Math.round(rawScore);
        return {
            score: weightedScore,
            weight: this.weights[category] ?? 1.0,
            confidence,
            reasoning: `${category} priority based on household composition and lifestyle factors`,
        };
    }
};
exports.PriorityEngineService = PriorityEngineService;
exports.PriorityEngineService = PriorityEngineService = __decorate([
    (0, common_1.Injectable)()
], PriorityEngineService);
//# sourceMappingURL=priority-engine.service.js.map