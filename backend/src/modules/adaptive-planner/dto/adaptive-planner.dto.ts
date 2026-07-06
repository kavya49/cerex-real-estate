import {
  IsObject,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class QuestionnaireOptionDto {
  @ApiProperty({ example: "Just Me" })
  @IsString()
  value: string;

  @ApiProperty({ example: "Just Me" })
  @IsString()
  label: string;

  @ApiPropertyOptional({ example: "single-person" })
  @IsOptional()
  @IsString()
  key?: string;
}

export class QuestionnaireQuestionDto {
  @ApiProperty({ example: "household" })
  @IsString()
  key: string;

  @ApiProperty({ example: "Who will live here?" })
  @IsString()
  label: string;

  @ApiProperty({
    example: "single",
    description: "single, multi, slider, scale",
  })
  @IsString()
  type: string;

  @ApiProperty({ example: "household" })
  @IsString()
  category: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isMandatory: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiPropertyOptional({ type: [QuestionnaireOptionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionnaireOptionDto)
  options?: QuestionnaireOptionDto[];

  @ApiPropertyOptional({ example: 200000 })
  @IsOptional()
  @IsNumber()
  minValue?: number;

  @ApiPropertyOptional({ example: 2000000 })
  @IsOptional()
  @IsNumber()
  maxValue?: number;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @IsNumber()
  step?: number;

  @ApiPropertyOptional({ example: "L" })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ description: "Branching conditions" })
  @IsOptional()
  @IsObject()
  dependsOn?: Record<string, any>;

  @ApiPropertyOptional({ example: "household" })
  @IsOptional()
  @IsString()
  branchKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class QuestionnaireDto {
  @ApiProperty({ example: "default-v1" })
  @IsString()
  id: string;

  @ApiProperty({ example: "Default Questionnaire v1" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: "Standard questionnaire for all projects" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "1.0" })
  @IsString()
  version: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  mandatoryCount: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  maxQuestions: number;

  @ApiProperty({ example: 75 })
  @IsNumber()
  avgCompletionSecs: number;

  @ApiProperty({ type: [QuestionnaireQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionnaireQuestionDto)
  questions: QuestionnaireQuestionDto[];
}

export class PlannerAnswerRequestDto {
  @ApiProperty({ example: "household" })
  @IsString()
  questionKey: string;

  @ApiProperty({ description: "Answer value" })
  value: any;

  @ApiPropertyOptional({ example: "single" })
  @IsOptional()
  @IsString()
  valueType?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isUnknown?: boolean;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  @IsNumber()
  timeSpentMs?: number;
}

export class StartPlannerRequestDto {
  @ApiPropertyOptional({ example: "default-v1" })
  @IsOptional()
  @IsString()
  questionnaireId?: string;
}

export class SubmitAnswerRequestDto {
  @ApiProperty({ example: "household" })
  @IsString()
  questionKey: string;

  @ApiProperty({ description: "Answer value" })
  value: any;

  @ApiPropertyOptional({ example: "single" })
  @IsOptional()
  @IsString()
  valueType?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isUnknown?: boolean;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  @IsNumber()
  timeSpentMs?: number;
}

export class PlannerStateDto {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  questionnaireId: string;

  @ApiProperty()
  questionnaireVersion: string;

  @ApiProperty({ type: [PlannerAnswerRequestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlannerAnswerRequestDto)
  answers: PlannerAnswerRequestDto[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  completedQuestions: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  pendingQuestions: string[];

  @ApiProperty()
  currentQuestion: string | null;

  @ApiProperty()
  progress: number;

  @ApiProperty()
  isComplete: boolean;

  @ApiProperty()
  mandatoryComplete: boolean;

  @ApiProperty()
  branchPath: string;

  @ApiProperty()
  startedAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PlannerPreviewDto {
  @ApiProperty()
  householdSize: number;

  @ApiProperty()
  hasChildren: boolean;

  @ApiProperty()
  workFromHome: string;

  @ApiProperty()
  moveInMonths: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  topPriorities: string[];

  @ApiProperty()
  budgetTier: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  stylePreferences: string[];

  @ApiProperty()
  previewGenerated: boolean;
}

export class PlannerResponseDto {
  @ApiProperty({ type: PlannerStateDto })
  @ValidateNested()
  @Type(() => PlannerStateDto)
  state: PlannerStateDto;

  @ApiPropertyOptional({ type: PlannerPreviewDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PlannerPreviewDto)
  preview?: PlannerPreviewDto;
}

export class QuestionnaireCreateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  developerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ example: "Default Questionnaire v1" })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "1.0" })
  @IsString()
  version: string;

  @ApiProperty({ type: [QuestionnaireQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionnaireQuestionDto)
  questions: QuestionnaireQuestionDto[];
}

export class QuestionnaireUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class PlannerAnalyticsEventDto {
  @ApiProperty({
    example: "started",
    description:
      "started, answered, changed, skipped, completed, resumed, dropped",
  })
  @IsString()
  eventType: string;

  @ApiProperty({ example: "household" })
  @IsString()
  questionKey: string;

  @ApiPropertyOptional({ example: "Just Me" })
  @IsOptional()
  value?: any;

  @ApiPropertyOptional({ example: "Family" })
  @IsOptional()
  previousValue?: any;

  @ApiPropertyOptional({ example: 5000 })
  @IsOptional()
  @IsNumber()
  timeSpentMs?: number;

  @ApiPropertyOptional({ example: "household" })
  @IsOptional()
  @IsString()
  branchKey?: string;

  @ApiProperty({ example: "abc123" })
  @IsString()
  anonymousId: string;
}
