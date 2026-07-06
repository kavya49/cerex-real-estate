"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstraintEngineService = void 0;
const common_1 = require("@nestjs/common");
let ConstraintEngineService = class ConstraintEngineService {
    constructor() {
        this.constraintDefinitions = {
            DedicatedOffice: {
                name: "Dedicated Office",
                type: "spatial",
                sourceRule: "RULE_REMOTE_WORK",
                requiredFacts: ["workFromHome"],
                requiredValues: ["always"],
            },
            LargeDining: {
                name: "Large Dining Area",
                type: "spatial",
                sourceRule: "RULE_LARGE_FAMILY_DINING",
                requiredFacts: ["childrenCount"],
                requiredValues: [3],
            },
            HighStorage: {
                name: "High Storage Capacity",
                type: "storage",
                sourceRule: "RULE_LARGE_FAMILY_STORAGE",
                requiredFacts: ["childrenCount"],
                requiredValues: [2],
            },
            ChildSafeLayout: {
                name: "Child Safe Layout",
                type: "safety",
                sourceRule: "RULE_CHILD_SAFETY",
                requiredFacts: ["childrenPresent"],
                requiredValues: [true],
            },
            PetFriendlyFlooring: {
                name: "Pet Friendly Flooring",
                type: "safety",
                sourceRule: "RULE_PET_SAFETY",
                requiredFacts: ["petCount"],
                requiredValues: [1],
            },
            SeniorAccessibleBathroom: {
                name: "Senior Accessible Bathroom",
                type: "accessibility",
                sourceRule: "RULE_SENIOR_ACCESSIBILITY",
                requiredFacts: ["seniorCount"],
                requiredValues: [1],
            },
            NoGlassFurniture: {
                name: "No Glass Furniture",
                type: "safety",
                sourceRule: "RULE_CHILD_SAFETY",
                requiredFacts: ["childrenPresent"],
                requiredValues: [true],
            },
            LowMaintenanceMaterials: {
                name: "Low Maintenance Materials",
                type: "maintenance",
                sourceRule: "RULE_BUDGET_BUDGET",
                requiredFacts: ["childrenCount"],
                requiredValues: [1],
            },
        };
    }
    generateConstraints(facts) {
        const constraints = [];
        for (const [id, definition] of Object.entries(this.constraintDefinitions)) {
            const applicable = this.checkApplicable(definition, facts);
            if (applicable) {
                constraints.push({
                    id,
                    name: definition.name,
                    confidence: this.calculateConfidence(definition, facts),
                    sourceRules: [definition.sourceRule],
                    reason: this.generateReason(definition, facts),
                });
            }
        }
        return constraints;
    }
    checkApplicable(definition, facts) {
        const { requiredFacts, requiredValues } = definition;
        for (let i = 0; i < requiredFacts.length; i++) {
            const factKey = requiredFacts[i];
            const requiredValue = requiredValues[i];
            const factValue = facts[requiredFacts[i]]?.value;
            if (factValue === undefined)
                return false;
            if (typeof requiredValue === "number" && requiredValue > 0) {
                if (Number(factValue) <= requiredValue)
                    return false;
            }
            else if (requiredValue === true) {
                if (factValue !== true)
                    return false;
            }
            else if (factValue !== requiredValue) {
                return false;
            }
        }
        return true;
    }
    calculateConfidence(definition, facts) {
        let confidence = 0.8;
        const supportingFacts = Object.keys(facts).filter((factKey) => definition.requiredFacts.includes(factKey) &&
            facts[factKey]?.value !== undefined).length;
        confidence += Math.min(0.15, supportingFacts * 0.05);
        return Math.min(0.95, confidence);
    }
    generateReason(definition, facts) {
        const factDescriptions = {
            workFromHome: "works from home",
            childrenCount: "has children",
            childrenPresent: "has children",
            petCount: "has pets",
            seniorCount: "has seniors",
        };
        const reasons = definition.requiredFacts
            .map((fact) => factDescriptions[fact] || fact)
            .join(", ");
        return `${definition.name} required because buyer ${reasons}`;
    }
};
exports.ConstraintEngineService = ConstraintEngineService;
exports.ConstraintEngineService = ConstraintEngineService = __decorate([
    (0, common_1.Injectable)()
], ConstraintEngineService);
//# sourceMappingURL=constraint-engine.service.js.map