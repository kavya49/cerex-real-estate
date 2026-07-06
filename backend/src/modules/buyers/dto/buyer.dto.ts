import {
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateBuyerDto {
  @ApiProperty({ example: "buyer@example.com" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: "+91 9876543210" })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: "Aarav Mehta" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: "4" })
  @IsOptional()
  @IsString()
  familySize?: string;

  @ApiPropertyOptional({ example: "1" })
  @IsOptional()
  @IsString()
  children?: string;

  @ApiPropertyOptional({ example: "Full-time" })
  @IsOptional()
  @IsString()
  workFromHome?: string;

  @ApiPropertyOptional({ example: "Balanced" })
  @IsOptional()
  @IsString()
  lifestyle?: string;

  @ApiPropertyOptional({ example: "1 year" })
  @IsOptional()
  @IsString()
  timeline?: string;

  @ApiPropertyOptional({ example: "Modern Luxury" })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiPropertyOptional({ example: 2.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ example: "modern-luxury" })
  @IsOptional()
  @IsString()
  selectedLayout?: string;
}

export class UpdateBuyerDto {
  @ApiPropertyOptional({ example: "+91 9876543210" })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: "Aarav Mehta" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: "4" })
  @IsOptional()
  @IsString()
  familySize?: string;

  @ApiPropertyOptional({ example: "1" })
  @IsOptional()
  @IsString()
  children?: string;

  @ApiPropertyOptional({ example: "Full-time" })
  @IsOptional()
  @IsString()
  workFromHome?: string;

  @ApiPropertyOptional({ example: "Balanced" })
  @IsOptional()
  @IsString()
  lifestyle?: string;

  @ApiPropertyOptional({ example: "1 year" })
  @IsOptional()
  @IsString()
  timeline?: string;

  @ApiPropertyOptional({ example: "Modern Luxury" })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiPropertyOptional({ example: 2.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ example: "modern-luxury" })
  @IsOptional()
  @IsString()
  selectedLayout?: string;

  @ApiPropertyOptional({ example: { key: "value" } })
  @IsOptional()
  preferences?: any;

  @ApiPropertyOptional({ example: { key: "value" } })
  @IsOptional()
  dnaProfile?: any;
}

export class BuyerQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: "Aarav" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: "modern-luxury" })
  @IsOptional()
  @IsString()
  layout?: string;
}
