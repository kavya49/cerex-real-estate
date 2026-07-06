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
exports.KnowledgeQueryDto = exports.UpdateKnowledgeDto = exports.CreateKnowledgeDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateKnowledgeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, content: { required: true, type: () => String }, category: { required: true, type: () => String }, tags: { required: false, type: () => [String] }, isPublished: { required: false, type: () => Boolean }, priority: { required: false, type: () => Number }, metadata: { required: false, type: () => Object } };
    }
}
exports.CreateKnowledgeDto = CreateKnowledgeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "How to book a site visit" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKnowledgeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Visit our experience centre..." }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKnowledgeDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "general" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateKnowledgeDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ["booking", "visit"] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateKnowledgeDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateKnowledgeDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKnowledgeDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { seo: "keywords" } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateKnowledgeDto.prototype, "metadata", void 0);
class UpdateKnowledgeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, content: { required: false, type: () => String }, category: { required: false, type: () => String }, tags: { required: false, type: () => [String] }, isPublished: { required: false, type: () => Boolean }, priority: { required: false, type: () => Number } };
    }
}
exports.UpdateKnowledgeDto = UpdateKnowledgeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "How to book a site visit" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateKnowledgeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Visit our experience centre..." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateKnowledgeDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "general" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateKnowledgeDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ["booking", "visit"] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateKnowledgeDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateKnowledgeDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateKnowledgeDto.prototype, "priority", void 0);
class KnowledgeQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number, default: 1 }, limit: { required: false, type: () => Number, default: 20 }, category: { required: false, type: () => String }, isPublished: { required: false, type: () => Boolean } };
    }
}
exports.KnowledgeQueryDto = KnowledgeQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], KnowledgeQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], KnowledgeQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "general" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KnowledgeQueryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], KnowledgeQueryDto.prototype, "isPublished", void 0);
//# sourceMappingURL=knowledge.dto.js.map