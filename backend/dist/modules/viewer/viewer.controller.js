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
exports.ViewerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const viewer_service_1 = require("./viewer.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let ViewerController = class ViewerController {
    constructor(viewerService) {
        this.viewerService = viewerService;
    }
    async getModels(projectId) {
        return this.viewerService.getModels(projectId);
    }
    async getModel(projectId, modelId) {
        return this.viewerService.getModel(projectId, modelId);
    }
};
exports.ViewerController = ViewerController;
__decorate([
    (0, common_1.Get)("models"),
    (0, swagger_1.ApiOperation)({ summary: "Get available 3Disp 3D models for project" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ViewerController.prototype, "getModels", null);
__decorate([
    (0, common_1.Get)("models/:modelId"),
    (0, swagger_1.ApiOperation)({ summary: "Get 3D model by ID" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "modelId", description: "Model ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("modelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ViewerController.prototype, "getModel", null);
exports.ViewerController = ViewerController = __decorate([
    (0, swagger_1.ApiTags)("viewer"),
    (0, common_1.Controller)("projects/:projectId/viewer"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [viewer_service_1.ViewerService])
], ViewerController);
//# sourceMappingURL=viewer.controller.js.map