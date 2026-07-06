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
exports.StorageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const storage_service_1 = require("./storage.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async uploadUrl(projectId, body) {
        return this.storageService.getUploadUrl(projectId, body.filename, body.contentType);
    }
    async list(projectId, query) {
        return this.storageService.list(projectId, query);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)("upload"),
    (0, swagger_1.ApiOperation)({ summary: "Get signed upload URL" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadUrl", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "List stored objects" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "list", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)("storage"),
    (0, common_1.Controller)("projects/:projectId/storage"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map