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
exports.BuyerQueryDto = exports.UpdateBuyerDto = exports.CreateBuyerDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateBuyerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, phone: { required: false, type: () => String, maxLength: 20 }, name: { required: false, type: () => String, maxLength: 100 }, familySize: { required: false, type: () => String }, children: { required: false, type: () => String }, workFromHome: { required: false, type: () => String }, lifestyle: { required: false, type: () => String }, timeline: { required: false, type: () => String }, style: { required: false, type: () => String }, budget: { required: false, type: () => Number }, selectedLayout: { required: false, type: () => String } };
    }
}
exports.CreateBuyerDto = CreateBuyerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "buyer@example.com" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+91 9876543210" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Aarav Mehta" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "4" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "familySize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "1" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Full-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "workFromHome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Balanced" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "lifestyle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "1 year" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBuyerDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "modern-luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "selectedLayout", void 0);
class UpdateBuyerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: false, type: () => String, maxLength: 20 }, name: { required: false, type: () => String, maxLength: 100 }, familySize: { required: false, type: () => String }, children: { required: false, type: () => String }, workFromHome: { required: false, type: () => String }, lifestyle: { required: false, type: () => String }, timeline: { required: false, type: () => String }, style: { required: false, type: () => String }, budget: { required: false, type: () => Number }, selectedLayout: { required: false, type: () => String }, preferences: { required: false, type: () => Object }, dnaProfile: { required: false, type: () => Object } };
    }
}
exports.UpdateBuyerDto = UpdateBuyerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+91 9876543210" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Aarav Mehta" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "4" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "familySize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "1" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Full-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "workFromHome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Balanced" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "lifestyle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "1 year" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateBuyerDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "modern-luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "selectedLayout", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { key: "value" } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateBuyerDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { key: "value" } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateBuyerDto.prototype, "dnaProfile", void 0);
class BuyerQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number, default: 1 }, limit: { required: false, type: () => Number, default: 20 }, search: { required: false, type: () => String }, layout: { required: false, type: () => String } };
    }
}
exports.BuyerQueryDto = BuyerQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BuyerQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BuyerQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Aarav" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BuyerQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "modern-luxury" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BuyerQueryDto.prototype, "layout", void 0);
//# sourceMappingURL=buyer.dto.js.map