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
exports.PlannerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const planner_service_1 = require("./planner.service");
const planner_dto_1 = require("./dto/planner.dto");
const buyer_session_guard_1 = require("../../guards/buyer-session.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let PlannerController = class PlannerController {
    constructor(plannerService) {
        this.plannerService = plannerService;
    }
    async submitAnswers(projectId, plannerAnswersDto, req) {
        const buyerId = req.buyer.id;
        return this.plannerService.processAnswers(projectId, buyerId, plannerAnswersDto);
    }
    async getLayouts(projectId) {
        return this.plannerService.getLayouts(projectId);
    }
    async getRecommendation(projectId, plannerAnswersDto) {
        return this.plannerService.getRecommendation(projectId, plannerAnswersDto);
    }
};
exports.PlannerController = PlannerController;
__decorate([
    (0, common_1.Post)("answers"),
    (0, swagger_1.ApiOperation)({ summary: "Submit planner answers and get recommendation" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planner_dto_1.PlannerAnswersDto, Object]),
    __metadata("design:returntype", Promise)
], PlannerController.prototype, "submitAnswers", null);
__decorate([
    (0, common_1.Get)("layouts"),
    (0, swagger_1.ApiOperation)({ summary: "Get available layouts for project" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlannerController.prototype, "getLayouts", null);
__decorate([
    (0, common_1.Post)("recommendation"),
    (0, swagger_1.ApiOperation)({ summary: "Get AI recommendation based on answers" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, planner_dto_1.PlannerAnswersDto]),
    __metadata("design:returntype", Promise)
], PlannerController.prototype, "getRecommendation", null);
exports.PlannerController = PlannerController = __decorate([
    (0, swagger_1.ApiTags)("planner"),
    (0, common_1.Controller)("projects/:projectId/planner"),
    (0, common_1.UseGuards)(buyer_session_guard_1.BuyerSessionGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [planner_service_1.PlannerService])
], PlannerController);
//# sourceMappingURL=planner.controller.js.map