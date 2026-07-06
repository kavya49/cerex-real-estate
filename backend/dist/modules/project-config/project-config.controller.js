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
exports.ProjectConfigController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_config_service_1 = require("./project-config.service");
const project_config_dto_1 = require("./dto/project-config.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let ProjectConfigController = class ProjectConfigController {
    constructor(projectConfigService) {
        this.projectConfigService = projectConfigService;
    }
    async findOne(projectId) {
        return this.projectConfigService.findOne(projectId);
    }
    async update(projectId, updateProjectConfigDto) {
        return this.projectConfigService.update(projectId, updateProjectConfigDto);
    }
};
exports.ProjectConfigController = ProjectConfigController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get project configuration" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Update project configuration" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_config_dto_1.UpdateProjectConfigDto]),
    __metadata("design:returntype", Promise)
], ProjectConfigController.prototype, "update", null);
exports.ProjectConfigController = ProjectConfigController = __decorate([
    (0, swagger_1.ApiTags)("project-config"),
    (0, common_1.Controller)("projects/:projectId/config"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [project_config_service_1.ProjectConfigService])
], ProjectConfigController);
//# sourceMappingURL=project-config.controller.js.map