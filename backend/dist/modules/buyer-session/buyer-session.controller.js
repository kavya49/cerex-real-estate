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
exports.BuyerSessionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const buyer_session_service_1 = require("./buyer-session.service");
const buyer_session_dto_1 = require("./dto/buyer-session.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
const buyer_session_guard_1 = require("../../guards/buyer-session.guard");
let BuyerSessionController = class BuyerSessionController {
    constructor(buyerSessionService) {
        this.buyerSessionService = buyerSessionService;
    }
    async createSession(projectId, dto, ipAddress) {
        return this.buyerSessionService.createSession(projectId, dto, ipAddress);
    }
    async refreshSession(projectId, dto) {
        return this.buyerSessionService.refreshSession(projectId, dto);
    }
    async getProfile(req) {
        const { buyer, session } = req;
        return {
            buyer: {
                id: buyer.id,
                email: buyer.email,
                name: buyer.name,
                familySize: buyer.familySize,
                children: buyer.children,
                workFromHome: buyer.workFromHome,
                lifestyle: buyer.lifestyle,
                timeline: buyer.timeline,
                style: buyer.style,
                budget: buyer.budget,
                selectedLayout: buyer.selectedLayout,
            },
            session: {
                id: session.id,
                expiresAt: session.expiresAt,
                lastSeenAt: session.lastSeenAt,
            },
        };
    }
};
exports.BuyerSessionController = BuyerSessionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Create a new anonymous buyer session" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./dto/buyer-session.dto").BuyerSessionResponseDto }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, buyer_session_dto_1.CreateBuyerSessionDto, String]),
    __metadata("design:returntype", Promise)
], BuyerSessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Refresh access token using refresh token" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/buyer-session.dto").BuyerSessionResponseDto }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, buyer_session_dto_1.RefreshBuyerSessionDto]),
    __metadata("design:returntype", Promise)
], BuyerSessionController.prototype, "refreshSession", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(buyer_session_guard_1.BuyerSessionGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get current buyer profile from session" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerSessionController.prototype, "getProfile", null);
exports.BuyerSessionController = BuyerSessionController = __decorate([
    (0, swagger_1.ApiTags)("buyer-session"),
    (0, common_1.Controller)("projects/:projectId/buyer/session"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [buyer_session_service_1.BuyerSessionService])
], BuyerSessionController);
//# sourceMappingURL=buyer-session.controller.js.map