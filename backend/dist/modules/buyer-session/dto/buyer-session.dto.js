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
exports.BuyerSessionResponseDto = exports.RefreshBuyerSessionDto = exports.CreateBuyerSessionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateBuyerSessionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { deviceInfo: { required: false, type: () => String }, ipAddress: { required: false, type: () => String } };
    }
}
exports.CreateBuyerSessionDto = CreateBuyerSessionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Device info (user agent, etc.)" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerSessionDto.prototype, "deviceInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "IP address of the buyer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBuyerSessionDto.prototype, "ipAddress", void 0);
class RefreshBuyerSessionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { refreshToken: { required: true, type: () => String } };
    }
}
exports.RefreshBuyerSessionDto = RefreshBuyerSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Refresh token" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshBuyerSessionDto.prototype, "refreshToken", void 0);
class BuyerSessionResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { buyerId: { required: true, type: () => String }, sessionId: { required: true, type: () => String }, accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String }, expiresIn: { required: true, type: () => Number } };
    }
}
exports.BuyerSessionResponseDto = BuyerSessionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Buyer ID" }),
    __metadata("design:type", String)
], BuyerSessionResponseDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Session ID (access token ID)" }),
    __metadata("design:type", String)
], BuyerSessionResponseDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Access token (JWT)" }),
    __metadata("design:type", String)
], BuyerSessionResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Refresh token" }),
    __metadata("design:type", String)
], BuyerSessionResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Expires in seconds" }),
    __metadata("design:type", Number)
], BuyerSessionResponseDto.prototype, "expiresIn", void 0);
//# sourceMappingURL=buyer-session.dto.js.map