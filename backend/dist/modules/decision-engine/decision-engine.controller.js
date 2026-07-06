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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngineController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decision_engine_service_1 = require("./decision-engine.service");
const decision_engine_dto_1 = require("./dto/decision-engine.dto");
let DecisionEngineController = class DecisionEngineController {
    constructor(decisionEngineService) {
        this.decisionEngineService = decisionEngineService;
    }
    async evaluate(request) {
        return this.decisionEngineService.evaluate(request.snapshot);
    }
};
exports.DecisionEngineController = DecisionEngineController;
__decorate([
    (0, common_1.Post)("evaluate"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Evaluate decision engine for a buyer snapshot" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Decision evaluation result",
        type: decision_engine_dto_1.EvaluateDecisionResponseDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/decision-engine.dto").EvaluateDecisionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [decision_engine_dto_1.EvaluateDecisionRequestDto]),
    __metadata("design:returntype", Promise)
], DecisionEngineController.prototype, "evaluate", null);
exports.DecisionEngineController = DecisionEngineController = __decorate([
    (0, swagger_1.ApiTags)("decision-engine"),
    (0, common_1.Controller)("decision-engine"),
    __metadata("design:paramtypes", [decision_engine_service_1.DecisionEngineService])
], DecisionEngineController);
//# sourceMappingURL=decision-engine.controller.js.map