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
exports.FurnitureController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const furniture_service_1 = require("./furniture.service");
const furniture_dto_1 = require("./dto/furniture.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let FurnitureController = class FurnitureController {
    constructor(furnitureService) {
        this.furnitureService = furnitureService;
    }
    async create(projectId, dto) {
        return this.furnitureService.create(projectId, dto);
    }
    async findAll(projectId, query) {
        return this.furnitureService.findAll(projectId, query);
    }
    async findOne(projectId, id) {
        return this.furnitureService.findOne(projectId, id);
    }
    async update(projectId, id, dto) {
        return this.furnitureService.update(projectId, id, dto);
    }
    async remove(projectId, id) {
        return this.furnitureService.remove(projectId, id);
    }
};
exports.FurnitureController = FurnitureController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create furniture item" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, furniture_dto_1.CreateFurnitureDto]),
    __metadata("design:returntype", Promise)
], FurnitureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "List furniture" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, furniture_dto_1.FurnitureQueryDto]),
    __metadata("design:returntype", Promise)
], FurnitureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get furniture by ID" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Furniture ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FurnitureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update furniture" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Furniture ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, furniture_dto_1.UpdateFurnitureDto]),
    __metadata("design:returntype", Promise)
], FurnitureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete furniture" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Furniture ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FurnitureController.prototype, "remove", null);
exports.FurnitureController = FurnitureController = __decorate([
    (0, swagger_1.ApiTags)("furniture"),
    (0, common_1.Controller)("projects/:projectId/furniture"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [furniture_service_1.FurnitureService])
], FurnitureController);
//# sourceMappingURL=furniture.controller.js.map