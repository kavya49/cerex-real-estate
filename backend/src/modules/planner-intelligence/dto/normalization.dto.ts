import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class NormalizePlannerRequestDto {
  @ApiProperty({ description: "Raw planner answers from frontend" })
  @IsObject()
  answers: Record<string, any>;

  @ApiPropertyOptional({
    description: "Project ID (optional, can come from context)",
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional({
    description: "Buyer ID (optional, can come from session)",
  })
  @IsOptional()
  @IsString()
  buyerId?: string;

  @ApiPropertyOptional({ description: "Session ID (optional)" })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class HouseholdNormalizedDto {
  @ApiProperty({ description: "Number of adults in household", example: 2 })
  adults: number;

  @ApiProperty({ description: "Number of children in household", example: 1 })
  children: number;

  @ApiProperty({ description: "Total household size", example: 3 })
  total: number;

  @ApiProperty({
    description: "Whether any children are present",
    example: true,
  })
  hasChildren: boolean;

  @ApiProperty({
    description: "Age ranges of children if applicable",
    example: ["toddler", "school-age"],
  })
  childrenAgeRanges: string[];
}

export class LifestyleNormalizedDto {
  @ApiProperty({
    description: "Primary lifestyle category",
    example: "balanced",
  })
  primary: string;

  @ApiProperty({
    description: "Work from home frequency",
    example: "full-time",
  })
  workFromHome: string;

  @ApiProperty({ description: "Move-in timeline in months", example: 6 })
  moveInMonths: number;

  @ApiProperty({
    description: "Whether buyer prefers quiet environment",
    example: false,
  })
  prefersQuiet: boolean;
}

export class DesignNormalizedDto {
  @ApiProperty({
    description: "Normalized interior style keys (atomic)",
    example: ["modern", "luxury"],
    isArray: true,
  })
  style: string[];

  @ApiProperty({
    description: "Whether style preference is explicitly set",
    example: true,
  })
  explicit: boolean;

  @ApiProperty({
    description: "Color palette preference",
    example: "neutral-warm",
  })
  colorPalette: string;
}

export class FinancialNormalizedDto {
  @ApiProperty({
    description: "Budget in base currency units (paise/cents)",
    example: 25000000,
  })
  budgetMinorUnits: number;

  @ApiProperty({ description: "Currency code", example: "INR" })
  currency: string;

  @ApiProperty({
    description: "Whether budget was explicitly provided",
    example: true,
  })
  explicit: boolean;
}

export class PreferencesNormalizedDto {
  @ApiProperty({
    description: "Whether buyer prefers balcony/outdoor space",
    example: true,
  })
  prefersBalcony: boolean;

  @ApiProperty({
    description: "Whether buyer needs home office",
    example: true,
  })
  needsHomeOffice: boolean;

  @ApiProperty({
    description: "Preferred floor level (low/mid/high)",
    example: "mid",
  })
  preferredFloorLevel: string;
}

export class NormalizedPlannerResultDto {
  @ApiProperty({ type: HouseholdNormalizedDto })
  @ValidateNested()
  @Type(() => HouseholdNormalizedDto)
  household: HouseholdNormalizedDto;

  @ApiProperty({ type: LifestyleNormalizedDto })
  @ValidateNested()
  @Type(() => LifestyleNormalizedDto)
  lifestyle: LifestyleNormalizedDto;

  @ApiProperty({ type: DesignNormalizedDto })
  @ValidateNested()
  @Type(() => DesignNormalizedDto)
  design: DesignNormalizedDto;

  @ApiProperty({ type: FinancialNormalizedDto })
  @ValidateNested()
  @Type(() => FinancialNormalizedDto)
  financial: FinancialNormalizedDto;

  @ApiProperty({ type: PreferencesNormalizedDto })
  @ValidateNested()
  @Type(() => PreferencesNormalizedDto)
  preferences: PreferencesNormalizedDto;

  @ApiProperty({ description: "Original raw answers for audit trail" })
  rawAnswers: Record<string, any>;

  @ApiProperty({ description: "Normalization version", example: 1 })
  version: number;

  @ApiProperty({ description: "Timestamp of normalization" })
  normalizedAt: Date;
}

export class NormalizePlannerResponseDto {
  @ApiProperty({ type: NormalizedPlannerResultDto })
  @ValidateNested()
  @Type(() => NormalizedPlannerResultDto)
  data: NormalizedPlannerResultDto;

  @ApiProperty({
    description: "Whether normalization was successful",
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({ description: "Warnings during normalization" })
  warnings?: string[];
}
