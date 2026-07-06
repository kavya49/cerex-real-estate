import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateKnowledgeDto {
  @ApiProperty({ example: "How to book a site visit" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Visit our experience centre..." })
  @IsString()
  content: string;

  @ApiProperty({ example: "general" })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: ["booking", "visit"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ example: { seo: "keywords" } })
  @IsOptional()
  metadata?: any;
}

export class UpdateKnowledgeDto {
  @ApiPropertyOptional({ example: "How to book a site visit" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Visit our experience centre..." })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: "general" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: ["booking", "visit"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;
}

export class KnowledgeQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: "general" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  isPublished?: boolean;
}
