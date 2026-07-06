import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PlannerAnswersDto {
  @ApiProperty({ example: "4" })
  @IsString()
  familySize: string;

  @ApiProperty({ example: "1" })
  @IsString()
  children: string;

  @ApiProperty({ example: "Full-time" })
  @IsString()
  workFromHome: string;

  @ApiProperty({ example: "Balanced" })
  @IsString()
  lifestyle: string;

  @ApiProperty({ example: "1 year" })
  @IsString()
  timeline: string;

  @ApiProperty({ example: "Modern Luxury" })
  @IsString()
  style: string;

  @ApiProperty({ example: 2.5 })
  @Type(() => Number)
  @IsNumber()
  budget: number;
}

export class PlannerRecommendationDto {
  @ApiProperty({ example: "modern-luxury" })
  layout: string;

  @ApiProperty({ example: 94 })
  score: number;
}
