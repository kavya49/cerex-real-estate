import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class CreateBuyerSessionDto {
  @ApiPropertyOptional({ description: "Device info (user agent, etc.)" })
  @IsOptional()
  @IsString()
  deviceInfo?: string;

  @ApiPropertyOptional({ description: "IP address of the buyer" })
  @IsOptional()
  @IsString()
  ipAddress?: string;
}

export class RefreshBuyerSessionDto {
  @ApiProperty({ description: "Refresh token" })
  @IsString()
  refreshToken: string;
}

export class BuyerSessionResponseDto {
  @ApiProperty({ description: "Buyer ID" })
  buyerId: string;

  @ApiProperty({ description: "Session ID (access token ID)" })
  sessionId: string;

  @ApiProperty({ description: "Access token (JWT)" })
  accessToken: string;

  @ApiProperty({ description: "Refresh token" })
  refreshToken: string;

  @ApiProperty({ description: "Expires in seconds" })
  expiresIn: number;
}
