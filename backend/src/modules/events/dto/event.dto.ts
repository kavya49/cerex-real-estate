import { IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateEventDto {
  @ApiProperty({ example: "page_view" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: { page: "/planner" } })
  @IsOptional()
  properties?: any;

  @ApiPropertyOptional({ example: "buyer_123" })
  @IsOptional()
  @IsString()
  buyerId?: string;

  @ApiPropertyOptional({ example: "session_456" })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional({ example: "Mozilla/5.0..." })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({ example: "192.168.1.1" })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({ example: "https://example.com" })
  @IsOptional()
  @IsString()
  referrer?: string;
}

export class EventQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 50;

  @ApiPropertyOptional({ example: "page_view" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "buyer_123" })
  @IsOptional()
  @IsString()
  buyerId?: string;

  @ApiPropertyOptional({ example: "session_456" })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
