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
exports.PlannerIntelligenceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const normalization_service_1 = require("./normalization.service");
const normalization_validator_1 = require("./normalization.validator");
const normalization_dto_1 = require("./dto/normalization.dto");
const buyer_session_guard_1 = require("../../guards/buyer-session.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let PlannerIntelligenceController = class PlannerIntelligenceController {
    constructor(normalizationService, validator) {
        this.normalizationService = normalizationService;
        this.validator = validator;
    }
    async normalize(request, req) {
        const enrichedRequest = {
            ...request,
            projectId: request.projectId || req.project?.projectId,
            buyerId: request.buyerId || req.buyer?.id,
            sessionId: request.sessionId || req.session?.id,
        };
        this.validator.validate(enrichedRequest);
        return this.normalizationService.normalize(enrichedRequest);
    }
};
exports.PlannerIntelligenceController = PlannerIntelligenceController;
__decorate([
    (0, common_1.Post)("normalize"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Normalize raw planner answers into structured normalized data",
    }),
    (0, swagger_1.ApiBody)({ type: normalization_dto_1.NormalizePlannerRequestDto }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/normalization.dto").NormalizePlannerResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [normalization_dto_1.NormalizePlannerRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PlannerIntelligenceController.prototype, "normalize", null);
exports.PlannerIntelligenceController = PlannerIntelligenceController = __decorate([
    (0, swagger_1.ApiTags)("planner-intelligence"),
    (0, common_1.Controller)("projects/:projectId/planner"),
    (0, common_1.UseGuards)(buyer_session_guard_1.BuyerSessionGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [normalization_service_1.NormalizationService,
        normalization_validator_1.NormalizationValidator])
], PlannerIntelligenceController);
//# sourceMappingURL=planner-intelligence.controller.js.map