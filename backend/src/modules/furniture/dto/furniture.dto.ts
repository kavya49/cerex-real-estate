import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateFurnitureDto {
  @ApiProperty({ example: "Sofa Set" })
  @IsString()
  name: string;

  @ApiProperty({ example: "seating" })
  @IsString()
  category: string;

  @ApiProperty({ example: "Modern Luxury" })
  @IsString()
  style: string;

  @ApiProperty({ example: "https://example.com/sofa.glb" })
  @IsUrl()
  modelUrl: string;

  @ApiProperty({ example: "https://example.com/sofa-thumb.jpg" })
  @IsUrl()
  thumbnailUrl: string;

  @ApiProperty({ example: { width: 200, depth: 90, height: 80 } })
  dimensions: Record<string, number>;

  @ApiPropertyOptional({ example: 45000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: { material: "leather" } })
  @IsOptional()
  metadata?: any;
}

export class UpdateFurnitureDto {
  @ApiPropertyOptional({ example: "Sofa Set" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "seating" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: "Modern Luxury" })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiPropertyOptional({ example: "https://example.com/sofa.glb" })
  @IsOptional()
  @IsUrl()
  modelUrl?: string;

  @ApiPropertyOptional({ example: "https://example.com/sofa-thumb.jpg" })
  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ example: { width: 200, depth: 90, height: 80 } })
  @IsOptional()
  dimensions?: Record<string, number>;

  @ApiPropertyOptional({ example: 45000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class FurnitureQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: "seating" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: "Modern Luxury" })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}
