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
exports.QuestionnaireAdminController = exports.AdaptivePlannerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const adaptive_planner_service_1 = require("./adaptive-planner.service");
const adaptive_planner_dto_1 = require("./dto/adaptive-planner.dto");
const buyer_session_guard_1 = require("../../guards/buyer-session.guard");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const custom_decorators_1 = require("../../decorators/custom.decorators");
let AdaptivePlannerController = class AdaptivePlannerController {
    constructor(adaptivePlannerService) {
        this.adaptivePlannerService = adaptivePlannerService;
    }
    async getQuestionnaire(projectId, questionnaireId) {
        return this.adaptivePlannerService.getQuestionnaire(questionnaireId);
    }
    async startPlanner(projectId, request, buyerId, sessionId) {
        const state = await this.adaptivePlannerService.startPlanner(request, projectId, buyerId, sessionId);
        const preview = state.mandatoryComplete
            ? this.adaptivePlannerService.generatePreview(state)
            : null;
        return { state, preview: preview || undefined };
    }
    async submitAnswer(projectId, request, buyerId, sessionId) {
        const state = await this.adaptivePlannerService.submitAnswer(projectId, buyerId, sessionId, request);
        const preview = state.mandatoryComplete
            ? this.adaptivePlannerService.generatePreview(state)
            : null;
        return { state, preview: preview || undefined };
    }
    async resumePlanner(projectId, sessionId, buyerId) {
        const state = await this.adaptivePlannerService.resumePlanner(projectId, buyerId, sessionId);
        const preview = state.mandatoryComplete
            ? this.adaptivePlannerService.generatePreview(state)
            : null;
        return { state, preview: preview || undefined };
    }
    async trackAnalytics(projectId, request, buyerId, sessionId, questionnaireId) {
        await this.adaptivePlannerService["logAnalytics"](projectId, questionnaireId, request, request.eventType, sessionId);
        return { success: true };
    }
};
exports.AdaptivePlannerController = AdaptivePlannerController;
__decorate([
    (0, common_1.Get)("questionnaire/:questionnaireId?"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Get questionnaire definition" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({
        name: "questionnaireId",
        required: false,
        description: "Questionnaire ID (optional, defaults to default-v1)",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Questionnaire definition",
        type: adaptive_planner_dto_1.QuestionnaireDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").QuestionnaireDto }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("questionnaireId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdaptivePlannerController.prototype, "getQuestionnaire", null);
__decorate([
    (0, common_1.Post)("start"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Start or resume planner session" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Planner state",
        type: adaptive_planner_dto_1.PlannerResponseDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").PlannerResponseDto }),
    __param(0, (0, custom_decorators_1.ProjectId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, custom_decorators_1.CurrentBuyer)("id")),
    __param(3, (0, custom_decorators_1.CurrentSession)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, adaptive_planner_dto_1.StartPlannerRequestDto, String, String]),
    __metadata("design:returntype", Promise)
], AdaptivePlannerController.prototype, "startPlanner", null);
__decorate([
    (0, common_1.Post)("answer"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Submit answer and get next question" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Updated planner state",
        type: adaptive_planner_dto_1.PlannerResponseDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").PlannerResponseDto }),
    __param(0, (0, custom_decorators_1.ProjectId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, custom_decorators_1.CurrentBuyer)("id")),
    __param(3, (0, custom_decorators_1.CurrentSession)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, adaptive_planner_dto_1.SubmitAnswerRequestDto, String, String]),
    __metadata("design:returntype", Promise)
], AdaptivePlannerController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)("resume/:sessionId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Resume planner session" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "sessionId", description: "Session ID to resume" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Resumed planner state",
        type: adaptive_planner_dto_1.PlannerResponseDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").PlannerResponseDto }),
    __param(0, (0, custom_decorators_1.ProjectId)()),
    __param(1, (0, common_1.Param)("sessionId")),
    __param(2, (0, custom_decorators_1.CurrentBuyer)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdaptivePlannerController.prototype, "resumePlanner", null);
__decorate([
    (0, common_1.Post)("analytics"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Track planner analytics event" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Analytics recorded" }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, custom_decorators_1.ProjectId)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, custom_decorators_1.CurrentBuyer)("id")),
    __param(3, (0, custom_decorators_1.CurrentSession)("id")),
    __param(4, (0, common_1.Query)("questionnaireId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, adaptive_planner_dto_1.PlannerAnalyticsEventDto, String, String, String]),
    __metadata("design:returntype", Promise)
], AdaptivePlannerController.prototype, "trackAnalytics", null);
exports.AdaptivePlannerController = AdaptivePlannerController = __decorate([
    (0, swagger_1.ApiTags)("adaptive-planner"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("projects/:projectId/adaptive-planner"),
    (0, common_1.UseGuards)(buyer_session_guard_1.BuyerSessionGuard),
    __metadata("design:paramtypes", [adaptive_planner_service_1.AdaptivePlannerService])
], AdaptivePlannerController);
let QuestionnaireAdminController = class QuestionnaireAdminController {
    constructor(adaptivePlannerService) {
        this.adaptivePlannerService = adaptivePlannerService;
    }
    async createQuestionnaire(request) {
        throw new Error("Not implemented - use database migration");
    }
    async listQuestionnaires(developerId, projectId) {
        return [];
    }
    async getQuestionnaire(id) {
        return this.adaptivePlannerService.getQuestionnaire(id);
    }
    async updateQuestionnaire(id, request) {
        throw new Error("Not implemented - use database migration");
    }
};
exports.QuestionnaireAdminController = QuestionnaireAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Create new questionnaire" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Questionnaire created",
        type: adaptive_planner_dto_1.QuestionnaireDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./dto/adaptive-planner.dto").QuestionnaireDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adaptive_planner_dto_1.QuestionnaireCreateDto]),
    __metadata("design:returntype", Promise)
], QuestionnaireAdminController.prototype, "createQuestionnaire", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "List all questionnaires" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of questionnaires",
        type: [adaptive_planner_dto_1.QuestionnaireDto],
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/adaptive-planner.dto").QuestionnaireDto] }),
    __param(0, (0, common_1.Query)("developerId")),
    __param(1, (0, common_1.Query)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuestionnaireAdminController.prototype, "listQuestionnaires", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Get questionnaire by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Questionnaire ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Questionnaire details",
        type: adaptive_planner_dto_1.QuestionnaireDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").QuestionnaireDto }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionnaireAdminController.prototype, "getQuestionnaire", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Update questionnaire" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Questionnaire ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Updated questionnaire",
        type: adaptive_planner_dto_1.QuestionnaireDto,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/adaptive-planner.dto").QuestionnaireDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, adaptive_planner_dto_1.QuestionnaireUpdateDto]),
    __metadata("design:returntype", Promise)
], QuestionnaireAdminController.prototype, "updateQuestionnaire", null);
exports.QuestionnaireAdminController = QuestionnaireAdminController = __decorate([
    (0, swagger_1.ApiTags)("admin/questionnaires"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("admin/questionnaires"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [adaptive_planner_service_1.AdaptivePlannerService])
], QuestionnaireAdminController);
//# sourceMappingURL=adaptive-planner.controller.js.map