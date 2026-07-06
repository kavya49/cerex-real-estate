"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptivePlannerModule = void 0;
const common_1 = require("@nestjs/common");
const adaptive_planner_controller_1 = require("./adaptive-planner.controller");
const adaptive_planner_service_1 = require("./adaptive-planner.service");
const decision_engine_module_1 = require("../decision-engine/decision-engine.module");
let AdaptivePlannerModule = class AdaptivePlannerModule {
};
exports.AdaptivePlannerModule = AdaptivePlannerModule;
exports.AdaptivePlannerModule = AdaptivePlannerModule = __decorate([
    (0, common_1.Module)({
        imports: [decision_engine_module_1.DecisionEngineModule],
        controllers: [adaptive_planner_controller_1.AdaptivePlannerController],
        providers: [adaptive_planner_service_1.AdaptivePlannerService],
        exports: [adaptive_planner_service_1.AdaptivePlannerService],
    })
], AdaptivePlannerModule);
//# sourceMappingURL=adaptive-planner.module.js.map