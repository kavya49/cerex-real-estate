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
exports.PlannerRecommendationDto = exports.PlannerAnswersDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class PlannerAnswersDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { familySize: { required: true, type: () => String }, children: { required: true, type: () => String }, workFromHome: { required: true, type: () => String }, lifestyle: { required: true, type: () => String }, timeline: { required: true, type: () => String }, style: { required: true, type: () => String }, budget: { required: true, type: () => Number } };
    }
}
exports.PlannerAnswersDto = PlannerAnswersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "4" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "familySize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Full-time" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "workFromHome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Balanced" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "lifestyle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1 year" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Modern Luxury" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswersDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlannerAnswersDto.prototype, "budget", void 0);
class PlannerRecommendationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { layout: { required: true, type: () => String }, score: { required: true, type: () => Number } };
    }
}
exports.PlannerRecommendationDto = PlannerRecommendationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "modern-luxury" }),
    __metadata("design:type", String)
], PlannerRecommendationDto.prototype, "layout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 94 }),
    __metadata("design:type", Number)
], PlannerRecommendationDto.prototype, "score", void 0);
//# sourceMappingURL=planner.dto.js.map