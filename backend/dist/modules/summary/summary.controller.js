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
exports.SummaryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const summary_service_1 = require("./summary.service");
const buyer_session_guard_1 = require("../../guards/buyer-session.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let SummaryController = class SummaryController {
    constructor(summaryService) {
        this.summaryService = summaryService;
    }
    async getSummary(projectId, req) {
        const buyerId = req.buyer.id;
        return this.summaryService.getSummary(projectId, buyerId);
    }
};
exports.SummaryController = SummaryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get buyer summary for project" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200, type: require("./dto/summary.dto").SummaryResponseDto }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SummaryController.prototype, "getSummary", null);
exports.SummaryController = SummaryController = __decorate([
    (0, swagger_1.ApiTags)("summary"),
    (0, common_1.Controller)("projects/:projectId/summary"),
    (0, common_1.UseGuards)(buyer_session_guard_1.BuyerSessionGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [summary_service_1.SummaryService])
], SummaryController);
//# sourceMappingURL=summary.controller.js.map