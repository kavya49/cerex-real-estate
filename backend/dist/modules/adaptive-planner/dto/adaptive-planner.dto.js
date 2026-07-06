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
exports.PlannerAnalyticsEventDto = exports.QuestionnaireUpdateDto = exports.QuestionnaireCreateDto = exports.PlannerResponseDto = exports.PlannerPreviewDto = exports.PlannerStateDto = exports.SubmitAnswerRequestDto = exports.StartPlannerRequestDto = exports.PlannerAnswerRequestDto = exports.QuestionnaireDto = exports.QuestionnaireQuestionDto = exports.QuestionnaireOptionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class QuestionnaireOptionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, label: { required: true, type: () => String }, key: { required: false, type: () => String } };
    }
}
exports.QuestionnaireOptionDto = QuestionnaireOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Just Me" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireOptionDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Just Me" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireOptionDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "single-person" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireOptionDto.prototype, "key", void 0);
class QuestionnaireQuestionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { key: { required: true, type: () => String }, label: { required: true, type: () => String }, type: { required: true, type: () => String }, category: { required: true, type: () => String }, isMandatory: { required: true, type: () => Boolean }, order: { required: true, type: () => Number }, options: { required: false, type: () => [require("./adaptive-planner.dto").QuestionnaireOptionDto] }, minValue: { required: false, type: () => Number }, maxValue: { required: false, type: () => Number }, step: { required: false, type: () => Number }, unit: { required: false, type: () => String }, dependsOn: { required: false, type: () => Object }, branchKey: { required: false, type: () => String }, metadata: { required: false, type: () => Object } };
    }
}
exports.QuestionnaireQuestionDto = QuestionnaireQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "household" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Who will live here?" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "single",
        description: "single, multi, slider, scale",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "household" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QuestionnaireQuestionDto.prototype, "isMandatory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireQuestionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [QuestionnaireOptionDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionnaireOptionDto),
    __metadata("design:type", Array)
], QuestionnaireQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireQuestionDto.prototype, "minValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireQuestionDto.prototype, "maxValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireQuestionDto.prototype, "step", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "L" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Branching conditions" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], QuestionnaireQuestionDto.prototype, "dependsOn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "household" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireQuestionDto.prototype, "branchKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], QuestionnaireQuestionDto.prototype, "metadata", void 0);
class QuestionnaireDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, version: { required: true, type: () => String }, mandatoryCount: { required: true, type: () => Number }, maxQuestions: { required: true, type: () => Number }, avgCompletionSecs: { required: true, type: () => Number }, questions: { required: true, type: () => [require("./adaptive-planner.dto").QuestionnaireQuestionDto] } };
    }
}
exports.QuestionnaireDto = QuestionnaireDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "default-v1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Default Questionnaire v1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Standard questionnaire for all projects" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1.0" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireDto.prototype, "mandatoryCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireDto.prototype, "maxQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionnaireDto.prototype, "avgCompletionSecs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [QuestionnaireQuestionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionnaireQuestionDto),
    __metadata("design:type", Array)
], QuestionnaireDto.prototype, "questions", void 0);
class PlannerAnswerRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionKey: { required: true, type: () => String }, value: { required: true, type: () => Object }, valueType: { required: false, type: () => String }, isUnknown: { required: false, type: () => Boolean }, timeSpentMs: { required: false, type: () => Number } };
    }
}
exports.PlannerAnswerRequestDto = PlannerAnswerRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "household" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswerRequestDto.prototype, "questionKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer value" }),
    __metadata("design:type", Object)
], PlannerAnswerRequestDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "single" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnswerRequestDto.prototype, "valueType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PlannerAnswerRequestDto.prototype, "isUnknown", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlannerAnswerRequestDto.prototype, "timeSpentMs", void 0);
class StartPlannerRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionnaireId: { required: false, type: () => String } };
    }
}
exports.StartPlannerRequestDto = StartPlannerRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "default-v1" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StartPlannerRequestDto.prototype, "questionnaireId", void 0);
class SubmitAnswerRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionKey: { required: true, type: () => String }, value: { required: true, type: () => Object }, valueType: { required: false, type: () => String }, isUnknown: { required: false, type: () => Boolean }, timeSpentMs: { required: false, type: () => Number } };
    }
}
exports.SubmitAnswerRequestDto = SubmitAnswerRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "household" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitAnswerRequestDto.prototype, "questionKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Answer value" }),
    __metadata("design:type", Object)
], SubmitAnswerRequestDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "single" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitAnswerRequestDto.prototype, "valueType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmitAnswerRequestDto.prototype, "isUnknown", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubmitAnswerRequestDto.prototype, "timeSpentMs", void 0);
class PlannerStateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { sessionId: { required: true, type: () => String }, questionnaireId: { required: true, type: () => String }, questionnaireVersion: { required: true, type: () => String }, answers: { required: true, type: () => [require("./adaptive-planner.dto").PlannerAnswerRequestDto] }, completedQuestions: { required: true, type: () => [String] }, pendingQuestions: { required: true, type: () => [String] }, currentQuestion: { required: true, type: () => String, nullable: true }, progress: { required: true, type: () => Number }, isComplete: { required: true, type: () => Boolean }, mandatoryComplete: { required: true, type: () => Boolean }, branchPath: { required: true, type: () => String }, startedAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.PlannerStateDto = PlannerStateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerStateDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerStateDto.prototype, "questionnaireId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerStateDto.prototype, "questionnaireVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlannerAnswerRequestDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlannerAnswerRequestDto),
    __metadata("design:type", Array)
], PlannerStateDto.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PlannerStateDto.prototype, "completedQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PlannerStateDto.prototype, "pendingQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlannerStateDto.prototype, "currentQuestion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlannerStateDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlannerStateDto.prototype, "isComplete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlannerStateDto.prototype, "mandatoryComplete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerStateDto.prototype, "branchPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlannerStateDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlannerStateDto.prototype, "updatedAt", void 0);
class PlannerPreviewDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { householdSize: { required: true, type: () => Number }, hasChildren: { required: true, type: () => Boolean }, workFromHome: { required: true, type: () => String }, moveInMonths: { required: true, type: () => Number }, topPriorities: { required: true, type: () => [String] }, budgetTier: { required: true, type: () => String }, stylePreferences: { required: true, type: () => [String] }, previewGenerated: { required: true, type: () => Boolean } };
    }
}
exports.PlannerPreviewDto = PlannerPreviewDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlannerPreviewDto.prototype, "householdSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlannerPreviewDto.prototype, "hasChildren", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerPreviewDto.prototype, "workFromHome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlannerPreviewDto.prototype, "moveInMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PlannerPreviewDto.prototype, "topPriorities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlannerPreviewDto.prototype, "budgetTier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PlannerPreviewDto.prototype, "stylePreferences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlannerPreviewDto.prototype, "previewGenerated", void 0);
class PlannerResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { state: { required: true, type: () => require("./adaptive-planner.dto").PlannerStateDto }, preview: { required: false, type: () => require("./adaptive-planner.dto").PlannerPreviewDto } };
    }
}
exports.PlannerResponseDto = PlannerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: PlannerStateDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PlannerStateDto),
    __metadata("design:type", PlannerStateDto)
], PlannerResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: PlannerPreviewDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PlannerPreviewDto),
    __metadata("design:type", PlannerPreviewDto)
], PlannerResponseDto.prototype, "preview", void 0);
class QuestionnaireCreateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { developerId: { required: false, type: () => String }, projectId: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, version: { required: true, type: () => String }, questions: { required: true, type: () => [require("./adaptive-planner.dto").QuestionnaireQuestionDto] } };
    }
}
exports.QuestionnaireCreateDto = QuestionnaireCreateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireCreateDto.prototype, "developerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireCreateDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Default Questionnaire v1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireCreateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1.0" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireCreateDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [QuestionnaireQuestionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionnaireQuestionDto),
    __metadata("design:type", Array)
], QuestionnaireCreateDto.prototype, "questions", void 0);
class QuestionnaireUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, isActive: { required: false, type: () => Boolean }, isDefault: { required: false, type: () => Boolean } };
    }
}
exports.QuestionnaireUpdateDto = QuestionnaireUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireUpdateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionnaireUpdateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QuestionnaireUpdateDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QuestionnaireUpdateDto.prototype, "isDefault", void 0);
class PlannerAnalyticsEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { eventType: { required: true, type: () => String }, questionKey: { required: true, type: () => String }, value: { required: false, type: () => Object }, previousValue: { required: false, type: () => Object }, timeSpentMs: { required: false, type: () => Number }, branchKey: { required: false, type: () => String }, anonymousId: { required: true, type: () => String } };
    }
}
exports.PlannerAnalyticsEventDto = PlannerAnalyticsEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "started",
        description: "started, answered, changed, skipped, completed, resumed, dropped",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnalyticsEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "household" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnalyticsEventDto.prototype, "questionKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Just Me" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PlannerAnalyticsEventDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Family" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PlannerAnalyticsEventDto.prototype, "previousValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlannerAnalyticsEventDto.prototype, "timeSpentMs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "household" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnalyticsEventDto.prototype, "branchKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "abc123" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannerAnalyticsEventDto.prototype, "anonymousId", void 0);
//# sourceMappingURL=adaptive-planner.dto.js.map