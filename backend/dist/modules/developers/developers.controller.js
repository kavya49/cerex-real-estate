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
exports.DevelopersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const developers_service_1 = require("./developers.service");
const developer_dto_1 = require("./dto/developer.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
let DevelopersController = class DevelopersController {
    constructor(developersService) {
        this.developersService = developersService;
    }
    async create(createDeveloperDto) {
        return this.developersService.create(createDeveloperDto);
    }
    async findAll(query) {
        return this.developersService.findAll(query);
    }
    async findOne(id) {
        return this.developersService.findOne(id);
    }
    async update(id, updateDeveloperDto) {
        return this.developersService.update(id, updateDeveloperDto);
    }
    async remove(id) {
        return this.developersService.remove(id);
    }
    async updateStatus(id, isActive) {
        return this.developersService.updateStatus(id, isActive);
    }
};
exports.DevelopersController = DevelopersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new developer" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [developer_dto_1.CreateDeveloperDto]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all developers" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [developer_dto_1.DeveloperQueryDto]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a developer by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Developer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a developer" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Developer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, developer_dto_1.UpdateDeveloperDto]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a developer" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Developer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(":id/status"),
    (0, swagger_1.ApiOperation)({ summary: "Update developer status" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Developer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("isActive")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], DevelopersController.prototype, "updateStatus", null);
exports.DevelopersController = DevelopersController = __decorate([
    (0, swagger_1.ApiTags)("developers"),
    (0, common_1.Controller)("developers"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "super-admin"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [developers_service_1.DevelopersService])
], DevelopersController);
//# sourceMappingURL=developers.controller.js.map