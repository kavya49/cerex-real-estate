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
exports.UpdateProjectConfigDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateProjectConfigDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { primaryColor: { required: false, type: () => String }, secondaryColor: { required: false, type: () => String }, accentColor: { required: false, type: () => String }, fontFamily: { required: false, type: () => String }, logoUrl: { required: false, type: () => String }, faviconUrl: { required: false, type: () => String }, metaTitle: { required: false, type: () => String }, metaDescription: { required: false, type: () => String }, ogImageUrl: { required: false, type: () => String }, googleAnalyticsId: { required: false, type: () => String }, facebookPixelId: { required: false, type: () => String }, hotjarId: { required: false, type: () => String }, customCss: { required: false, type: () => String }, customJs: { required: false, type: () => String }, enablePlanner: { required: false, type: () => Boolean }, enableViewer: { required: false, type: () => Boolean }, enableFurniture: { required: false, type: () => Boolean }, enableAIAssistant: { required: false, type: () => Boolean }, enableBudgetWidget: { required: false, type: () => Boolean }, enableHistoryWidget: { required: false, type: () => Boolean }, enableRecommendations: { required: false, type: () => Boolean }, enableWhatsApp: { required: false, type: () => Boolean }, whatsappNumber: { required: false, type: () => String }, smtpConfig: { required: false, type: () => Object } };
    }
}
exports.UpdateProjectConfigDto = UpdateProjectConfigDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#0F1A3A" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#D4A843" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#FFFFFF" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "accentColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Inter" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "fontFamily", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://example.com/logo.png" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://example.com/favicon.ico" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "faviconUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Skyline Heights - Luxury Homes" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "metaTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Discover luxury living at Skyline Heights" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://example.com/og-image.jpg" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "ogImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "GA-XXXXXXXXX" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "googleAnalyticsId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123456789" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "facebookPixelId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123456" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "hotjarId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "body { font-family: Inter; }" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "customCss", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'console.log("custom js");' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "customJs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enablePlanner", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableViewer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableFurniture", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableAIAssistant", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableBudgetWidget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableHistoryWidget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableRecommendations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectConfigDto.prototype, "enableWhatsApp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+91 9876543210" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectConfigDto.prototype, "whatsappNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { host: "smtp.example.com", port: 587 } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProjectConfigDto.prototype, "smtpConfig", void 0);
//# sourceMappingURL=project-config.dto.js.map