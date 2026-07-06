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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureQueryDto = exports.UpdateFurnitureDto = exports.CreateFurnitureDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateFurnitureDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, category: { required: true, type: () => String }, style: { required: true, type: () => String }, modelUrl: { required: true, type: () => String }, thumbnailUrl: { required: true, type: () => String }, dimensions: { required: true, type: () => Object }, price: { required: false, type: () => Number }, metadata: { required: false, type: () => Object } };
    }
}
exports.CreateFurnitureDto = CreateFurnitureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Sofa Set" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFurnitureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "seating" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFurnitureDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFurnitureDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/sofa.glb" }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateFurnitureDto.prototype, "modelUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/sofa-thumb.jpg" }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateFurnitureDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { width: 200, depth: 90, height: 80 } }),
    __metadata("design:type", Object)
], CreateFurnitureDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 45000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFurnitureDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { material: "leather" } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateFurnitureDto.prototype, "metadata", void 0);
class UpdateFurnitureDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, category: { required: false, type: () => String }, style: { required: false, type: () => String }, modelUrl: { required: false, type: () => String }, thumbnailUrl: { required: false, type: () => String }, dimensions: { required: false, type: () => Object }, price: { required: false, type: () => Number }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.UpdateFurnitureDto = UpdateFurnitureDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Sofa Set" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFurnitureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "seating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFurnitureDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFurnitureDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://example.com/sofa.glb" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateFurnitureDto.prototype, "modelUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://example.com/sofa-thumb.jpg" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateFurnitureDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { width: 200, depth: 90, height: 80 } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateFurnitureDto.prototype, "dimensions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 45000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFurnitureDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateFurnitureDto.prototype, "isActive", void 0);
class FurnitureQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number, default: 1 }, limit: { required: false, type: () => Number, default: 20 }, category: { required: false, type: () => String }, style: { required: false, type: () => String }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.FurnitureQueryDto = FurnitureQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FurnitureQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FurnitureQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "seating" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurnitureQueryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurnitureQueryDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], FurnitureQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=furniture.dto.js.map