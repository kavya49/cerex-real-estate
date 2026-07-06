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
exports.SummaryResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class SummaryResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { buyer: { required: true, type: () => ({ id: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String, nullable: true }, familySize: { required: true, type: () => String, nullable: true }, children: { required: true, type: () => String, nullable: true }, workFromHome: { required: true, type: () => String, nullable: true }, lifestyle: { required: true, type: () => String, nullable: true }, timeline: { required: true, type: () => String, nullable: true }, style: { required: true, type: () => String, nullable: true }, budget: { required: true, type: () => Number, nullable: true }, selectedLayout: { required: true, type: () => String, nullable: true }, lastActiveAt: { required: true, type: () => Date, nullable: true } }) }, layout: { required: true, type: () => ({ key: { required: true, type: () => String }, name: { required: true, type: () => String }, tag: { required: true, type: () => String }, sqft: { required: true, type: () => String }, tower: { required: true, type: () => String }, floor: { required: true, type: () => String } }), nullable: true }, events: { required: true }, lead: { required: true, type: () => ({ id: { required: true, type: () => String }, name: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, intent: { required: true, type: () => String }, status: { required: true, type: () => String }, createdAt: { required: true, type: () => Date } }), nullable: true }, project: { required: true, type: () => ({ id: { required: true, type: () => String }, name: { required: true, type: () => String }, slug: { required: true, type: () => String } }) } };
    }
}
exports.SummaryResponseDto = SummaryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SummaryResponseDto.prototype, "buyer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SummaryResponseDto.prototype, "layout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], SummaryResponseDto.prototype, "events", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SummaryResponseDto.prototype, "lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SummaryResponseDto.prototype, "project", void 0);
//# sourceMappingURL=summary.dto.js.map