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
exports.EvaluateDecisionResponseDto = exports.EvaluateDecisionRequestDto = exports.DecisionSnapshotDto = exports.ConstraintDto = exports.PriorityScoreDto = exports.AttributeDto = exports.FactDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class FactDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { key: { required: true, type: () => String }, value: { required: true, type: () => Object }, type: { required: true, type: () => String }, source: { required: true, type: () => String }, confidence: { required: true, type: () => Number } };
    }
}
exports.FactDto = FactDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], FactDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FactDto.prototype, "confidence", void 0);
class AttributeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { key: { required: true, type: () => String }, value: { required: true, type: () => Object }, type: { required: true, type: () => String }, confidence: { required: true, type: () => Number }, reasoning: { required: false, type: () => String } };
    }
}
exports.AttributeDto = AttributeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttributeDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AttributeDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttributeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttributeDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttributeDto.prototype, "reasoning", void 0);
class PriorityScoreDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: true, type: () => String }, score: { required: true, type: () => Number }, weight: { required: true, type: () => Number }, reasoning: { required: false, type: () => String } };
    }
}
exports.PriorityScoreDto = PriorityScoreDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PriorityScoreDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriorityScoreDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriorityScoreDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PriorityScoreDto.prototype, "reasoning", void 0);
class ConstraintDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, confidence: { required: true, type: () => Number }, sourceRules: { required: false, type: () => [String] }, reason: { required: true, type: () => String } };
    }
}
exports.ConstraintDto = ConstraintDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConstraintDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConstraintDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ConstraintDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ConstraintDto.prototype, "sourceRules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConstraintDto.prototype, "reason", void 0);
class DecisionSnapshotDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { buyerId: { required: true, type: () => String }, projectId: { required: true, type: () => String }, sessionId: { required: false, type: () => String }, facts: { required: true, type: () => Object }, attributes: { required: true, type: () => Object }, priorityScores: { required: true, type: () => Object }, constraints: { required: true, type: () => Object }, metadata: { required: false, type: () => Object }, ruleExecutionLog: { required: false, type: () => Object } };
    }
}
exports.DecisionSnapshotDto = DecisionSnapshotDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DecisionSnapshotDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DecisionSnapshotDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DecisionSnapshotDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "facts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "attributes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "priorityScores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "constraints", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DecisionSnapshotDto.prototype, "ruleExecutionLog", void 0);
class EvaluateDecisionRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { snapshot: { required: true, type: () => require("./decision-engine.dto").DecisionSnapshotDto } };
    }
}
exports.EvaluateDecisionRequestDto = EvaluateDecisionRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DecisionSnapshotDto),
    __metadata("design:type", DecisionSnapshotDto)
], EvaluateDecisionRequestDto.prototype, "snapshot", void 0);
class EvaluateDecisionResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { facts: { required: true, type: () => [require("./decision-engine.dto").FactDto] }, attributes: { required: true, type: () => Object }, priorityScores: { required: true, type: () => Object }, constraints: { required: true, type: () => [require("./decision-engine.dto").ConstraintDto] }, metadata: { required: true, type: () => ({ evaluatedAt: { required: true, type: () => Date }, snapshotId: { required: true, type: () => String }, ruleVersion: { required: true, type: () => String }, evaluationId: { required: false, type: () => String } }) }, explainability: { required: false, type: () => Object }, behaviourDimensions: { required: false, type: () => Object }, conflicts: { required: false, type: () => [Object] } };
    }
}
exports.EvaluateDecisionResponseDto = EvaluateDecisionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FactDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FactDto),
    __metadata("design:type", Array)
], EvaluateDecisionResponseDto.prototype, "facts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], EvaluateDecisionResponseDto.prototype, "attributes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PriorityScoreDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PriorityScoreDto),
    __metadata("design:type", Object)
], EvaluateDecisionResponseDto.prototype, "priorityScores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ConstraintDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ConstraintDto),
    __metadata("design:type", Array)
], EvaluateDecisionResponseDto.prototype, "constraints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], EvaluateDecisionResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], EvaluateDecisionResponseDto.prototype, "explainability", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], EvaluateDecisionResponseDto.prototype, "behaviourDimensions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], EvaluateDecisionResponseDto.prototype, "conflicts", void 0);
//# sourceMappingURL=decision-engine.dto.js.map