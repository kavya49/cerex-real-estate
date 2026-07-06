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
exports.BuyersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const buyers_service_1 = require("./buyers.service");
const buyer_dto_1 = require("./dto/buyer.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const project_access_guard_1 = require("../../guards/project-access.guard");
let BuyersController = class BuyersController {
    constructor(buyersService) {
        this.buyersService = buyersService;
    }
    async create(projectId, createBuyerDto) {
        return this.buyersService.create(projectId, createBuyerDto);
    }
    async findAll(projectId, query) {
        return this.buyersService.findAll(projectId, query);
    }
    async findOne(projectId, id) {
        return this.buyersService.findOne(projectId, id);
    }
    async findByEmail(projectId, email) {
        return this.buyersService.findByEmail(projectId, email);
    }
    async update(projectId, id, updateBuyerDto) {
        return this.buyersService.update(projectId, id, updateBuyerDto);
    }
    async remove(projectId, id) {
        return this.buyersService.remove(projectId, id);
    }
};
exports.BuyersController = BuyersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new buyer" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, buyer_dto_1.CreateBuyerDto]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all buyers for a project" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, buyer_dto_1.BuyerQueryDto]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a buyer by ID" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Buyer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("email/:email"),
    (0, swagger_1.ApiOperation)({ summary: "Get a buyer by email" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "email", description: "Buyer email" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a buyer" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Buyer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, buyer_dto_1.UpdateBuyerDto]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a buyer" }),
    (0, swagger_1.ApiParam)({ name: "projectId", description: "Project ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Buyer ID" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "remove", null);
exports.BuyersController = BuyersController = __decorate([
    (0, swagger_1.ApiTags)("buyers"),
    (0, common_1.Controller)("projects/:projectId/buyers"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, project_access_guard_1.ProjectAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [buyers_service_1.BuyersService])
], BuyersController);
//# sourceMappingURL=buyers.controller.js.map