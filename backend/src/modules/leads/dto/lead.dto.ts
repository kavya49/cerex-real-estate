import { IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateLeadDto {
  @ApiProperty({ example: "Aarav Mehta" })
  @IsString()
  name: string;

  @ApiProperty({ example: "+91 9876543210" })
  @IsString()
  phone: string;

  @ApiProperty({ example: "aarav@example.com" })
  @IsString()
  email: string;

  @ApiProperty({ example: "site_visit" })
  @IsString()
  intent: string;

  @ApiPropertyOptional({ example: "planner" })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ example: { notes: "Interested in Tower B" } })
  @IsOptional()
  metadata?: any;
}

export class UpdateLeadDto {
  @ApiPropertyOptional({ example: "Aarav Mehta" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "+91 9876543210" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: "aarav@example.com" })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: "site_visit" })
  @IsOptional()
  @IsString()
  intent?: string;

  @ApiPropertyOptional({ example: "new" })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 85 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ example: "user_123" })
  @IsOptional()
  @IsString()
  assignedTo?: string;
}

export class LeadQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: "new" })
  @IsOptional()
  @IsString()
  status?: string;
}
