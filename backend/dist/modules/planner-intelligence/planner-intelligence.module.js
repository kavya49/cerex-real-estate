"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerIntelligenceModule = void 0;
const common_1 = require("@nestjs/common");
const planner_intelligence_controller_1 = require("./planner-intelligence.controller");
const normalization_service_1 = require("./normalization.service");
const normalization_validator_1 = require("./normalization.validator");
const prisma_module_1 = require("../../prisma/prisma.module");
let PlannerIntelligenceModule = class PlannerIntelligenceModule {
};
exports.PlannerIntelligenceModule = PlannerIntelligenceModule;
exports.PlannerIntelligenceModule = PlannerIntelligenceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [planner_intelligence_controller_1.PlannerIntelligenceController],
        providers: [normalization_service_1.NormalizationService, normalization_validator_1.NormalizationValidator],
        exports: [normalization_service_1.NormalizationService, normalization_validator_1.NormalizationValidator],
    })
], PlannerIntelligenceModule);
//# sourceMappingURL=planner-intelligence.module.js.map