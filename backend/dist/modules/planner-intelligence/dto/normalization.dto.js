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
exports.NormalizePlannerResponseDto = exports.NormalizedPlannerResultDto = exports.PreferencesNormalizedDto = exports.FinancialNormalizedDto = exports.DesignNormalizedDto = exports.LifestyleNormalizedDto = exports.HouseholdNormalizedDto = exports.NormalizePlannerRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class NormalizePlannerRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { answers: { required: true, type: () => Object }, projectId: { required: false, type: () => String }, buyerId: { required: false, type: () => String }, sessionId: { required: false, type: () => String } };
    }
}
exports.NormalizePlannerRequestDto = NormalizePlannerRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Raw planner answers from frontend" }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], NormalizePlannerRequestDto.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Project ID (optional, can come from context)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NormalizePlannerRequestDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Buyer ID (optional, can come from session)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NormalizePlannerRequestDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Session ID (optional)" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NormalizePlannerRequestDto.prototype, "sessionId", void 0);
class HouseholdNormalizedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { adults: { required: true, type: () => Number }, children: { required: true, type: () => Number }, total: { required: true, type: () => Number }, hasChildren: { required: true, type: () => Boolean }, childrenAgeRanges: { required: true, type: () => [String] } };
    }
}
exports.HouseholdNormalizedDto = HouseholdNormalizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of adults in household", example: 2 }),
    __metadata("design:type", Number)
], HouseholdNormalizedDto.prototype, "adults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of children in household", example: 1 }),
    __metadata("design:type", Number)
], HouseholdNormalizedDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total household size", example: 3 }),
    __metadata("design:type", Number)
], HouseholdNormalizedDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether any children are present",
        example: true,
    }),
    __metadata("design:type", Boolean)
], HouseholdNormalizedDto.prototype, "hasChildren", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Age ranges of children if applicable",
        example: ["toddler", "school-age"],
    }),
    __metadata("design:type", Array)
], HouseholdNormalizedDto.prototype, "childrenAgeRanges", void 0);
class LifestyleNormalizedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { primary: { required: true, type: () => String }, workFromHome: { required: true, type: () => String }, moveInMonths: { required: true, type: () => Number }, prefersQuiet: { required: true, type: () => Boolean } };
    }
}
exports.LifestyleNormalizedDto = LifestyleNormalizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Primary lifestyle category",
        example: "balanced",
    }),
    __metadata("design:type", String)
], LifestyleNormalizedDto.prototype, "primary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Work from home frequency",
        example: "full-time",
    }),
    __metadata("design:type", String)
], LifestyleNormalizedDto.prototype, "workFromHome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Move-in timeline in months", example: 6 }),
    __metadata("design:type", Number)
], LifestyleNormalizedDto.prototype, "moveInMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether buyer prefers quiet environment",
        example: false,
    }),
    __metadata("design:type", Boolean)
], LifestyleNormalizedDto.prototype, "prefersQuiet", void 0);
class DesignNormalizedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { style: { required: true, type: () => [String] }, explicit: { required: true, type: () => Boolean }, colorPalette: { required: true, type: () => String } };
    }
}
exports.DesignNormalizedDto = DesignNormalizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Normalized interior style keys (atomic)",
        example: ["modern", "luxury"],
        isArray: true,
    }),
    __metadata("design:type", Array)
], DesignNormalizedDto.prototype, "style", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether style preference is explicitly set",
        example: true,
    }),
    __metadata("design:type", Boolean)
], DesignNormalizedDto.prototype, "explicit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Color palette preference",
        example: "neutral-warm",
    }),
    __metadata("design:type", String)
], DesignNormalizedDto.prototype, "colorPalette", void 0);
class FinancialNormalizedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { budgetMinorUnits: { required: true, type: () => Number }, currency: { required: true, type: () => String }, explicit: { required: true, type: () => Boolean } };
    }
}
exports.FinancialNormalizedDto = FinancialNormalizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Budget in base currency units (paise/cents)",
        example: 25000000,
    }),
    __metadata("design:type", Number)
], FinancialNormalizedDto.prototype, "budgetMinorUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Currency code", example: "INR" }),
    __metadata("design:type", String)
], FinancialNormalizedDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether budget was explicitly provided",
        example: true,
    }),
    __metadata("design:type", Boolean)
], FinancialNormalizedDto.prototype, "explicit", void 0);
class PreferencesNormalizedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { prefersBalcony: { required: true, type: () => Boolean }, needsHomeOffice: { required: true, type: () => Boolean }, preferredFloorLevel: { required: true, type: () => String } };
    }
}
exports.PreferencesNormalizedDto = PreferencesNormalizedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether buyer prefers balcony/outdoor space",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PreferencesNormalizedDto.prototype, "prefersBalcony", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether buyer needs home office",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PreferencesNormalizedDto.prototype, "needsHomeOffice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Preferred floor level (low/mid/high)",
        example: "mid",
    }),
    __metadata("design:type", String)
], PreferencesNormalizedDto.prototype, "preferredFloorLevel", void 0);
class NormalizedPlannerResultDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { household: { required: true, type: () => require("./normalization.dto").HouseholdNormalizedDto }, lifestyle: { required: true, type: () => require("./normalization.dto").LifestyleNormalizedDto }, design: { required: true, type: () => require("./normalization.dto").DesignNormalizedDto }, financial: { required: true, type: () => require("./normalization.dto").FinancialNormalizedDto }, preferences: { required: true, type: () => require("./normalization.dto").PreferencesNormalizedDto }, rawAnswers: { required: true, type: () => Object }, version: { required: true, type: () => Number }, normalizedAt: { required: true, type: () => Date } };
    }
}
exports.NormalizedPlannerResultDto = NormalizedPlannerResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: HouseholdNormalizedDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => HouseholdNormalizedDto),
    __metadata("design:type", HouseholdNormalizedDto)
], NormalizedPlannerResultDto.prototype, "household", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LifestyleNormalizedDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LifestyleNormalizedDto),
    __metadata("design:type", LifestyleNormalizedDto)
], NormalizedPlannerResultDto.prototype, "lifestyle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DesignNormalizedDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DesignNormalizedDto),
    __metadata("design:type", DesignNormalizedDto)
], NormalizedPlannerResultDto.prototype, "design", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FinancialNormalizedDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FinancialNormalizedDto),
    __metadata("design:type", FinancialNormalizedDto)
], NormalizedPlannerResultDto.prototype, "financial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PreferencesNormalizedDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PreferencesNormalizedDto),
    __metadata("design:type", PreferencesNormalizedDto)
], NormalizedPlannerResultDto.prototype, "preferences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Original raw answers for audit trail" }),
    __metadata("design:type", Object)
], NormalizedPlannerResultDto.prototype, "rawAnswers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Normalization version", example: 1 }),
    __metadata("design:type", Number)
], NormalizedPlannerResultDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Timestamp of normalization" }),
    __metadata("design:type", Date)
], NormalizedPlannerResultDto.prototype, "normalizedAt", void 0);
class NormalizePlannerResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("./normalization.dto").NormalizedPlannerResultDto }, success: { required: true, type: () => Boolean }, warnings: { required: false, type: () => [String] } };
    }
}
exports.NormalizePlannerResponseDto = NormalizePlannerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: NormalizedPlannerResultDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NormalizedPlannerResultDto),
    __metadata("design:type", NormalizedPlannerResultDto)
], NormalizePlannerResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether normalization was successful",
        example: true,
    }),
    __metadata("design:type", Boolean)
], NormalizePlannerResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Warnings during normalization" }),
    __metadata("design:type", Array)
], NormalizePlannerResponseDto.prototype, "warnings", void 0);
//# sourceMappingURL=normalization.dto.js.map