import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FactDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  value: any;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNumber()
  confidence: number;
}

export class AttributeDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  value: any;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  confidence: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reasoning?: string;
}

export class PriorityScoreDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reasoning?: string;
}

export class ConstraintDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  confidence: number;

  @ApiProperty({ type: [String] })
  @IsOptional()
  sourceRules?: string[];

  @ApiProperty()
  @IsString()
  reason: string;
}

export class DecisionSnapshotDto {
  @ApiProperty()
  @IsString()
  buyerId: string;

  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiProperty()
  @IsObject()
  facts: Record<string, any>;

  @ApiProperty()
  @IsObject()
  attributes: Record<string, any>;

  @ApiProperty()
  @IsObject()
  priorityScores: Record<string, any>;

  @ApiProperty()
  @IsObject()
  constraints: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  ruleExecutionLog?: Record<string, any>;
}

export class EvaluateDecisionRequestDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => DecisionSnapshotDto)
  snapshot: DecisionSnapshotDto;
}

export class EvaluateDecisionResponseDto {
  @ApiProperty({ type: [FactDto] })
  @ValidateNested({ each: true })
  @Type(() => FactDto)
  facts: FactDto[];

  @ApiProperty()
  attributes: any;

  @ApiProperty({ type: [PriorityScoreDto] })
  @ValidateNested({ each: true })
  @Type(() => PriorityScoreDto)
  priorityScores: Record<string, any>;

  @ApiProperty({ type: [ConstraintDto] })
  @ValidateNested({ each: true })
  @Type(() => ConstraintDto)
  constraints: ConstraintDto[];

  @ApiProperty()
  metadata: {
    evaluatedAt: Date;
    snapshotId: string;
    ruleVersion: string;
    evaluationId?: string;
  };

  @ApiPropertyOptional()
  explainability?: any;

  @ApiPropertyOptional()
  behaviourDimensions?: any;

  @ApiPropertyOptional()
  conflicts?: any[];
}
