import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsUrl,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateProjectDto {
  @ApiProperty({ example: "Skyline Heights" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: "Luxury residential project in Ahmedabad" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: "Where luxury meets lifestyle" })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ example: "https://example.com/logo.png" })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ example: "https://example.com/hero.jpg" })
  @IsOptional()
  @IsUrl()
  heroImageUrl?: string;

  @ApiPropertyOptional({ example: "SG Highway, Ahmedabad" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: "Ahmedabad" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: "Gujarat" })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: "India" })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: "380054" })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: 23.0225 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 72.5714 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: "2028-09-30T00:00:00.000Z" })
  @IsOptional()
  @Type(() => Date)
  possessionDate?: Date;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: "Skyline Heights Phase 2" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "Luxury residential project in Ahmedabad" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: "Where luxury meets lifestyle" })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional({ example: "https://example.com/logo.png" })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ example: "https://example.com/hero.jpg" })
  @IsOptional()
  @IsUrl()
  heroImageUrl?: string;

  @ApiPropertyOptional({ example: "SG Highway, Ahmedabad" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: "Ahmedabad" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: "Gujarat" })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: "India" })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: "380054" })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: 23.0225 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 72.5714 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: "2028-09-30T00:00:00.000Z" })
  @IsOptional()
  @Type(() => Date)
  possessionDate?: Date;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProjectQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ example: "Skyline" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished?: boolean;
}
