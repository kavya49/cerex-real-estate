import { IsOptional, IsString, IsUrl, IsBoolean } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProjectConfigDto {
  @ApiPropertyOptional({ example: "#0F1A3A" })
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiPropertyOptional({ example: "#D4A843" })
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiPropertyOptional({ example: "#FFFFFF" })
  @IsOptional()
  @IsString()
  accentColor?: string;

  @ApiPropertyOptional({ example: "Inter" })
  @IsOptional()
  @IsString()
  fontFamily?: string;

  @ApiPropertyOptional({ example: "https://example.com/logo.png" })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ example: "https://example.com/favicon.ico" })
  @IsOptional()
  @IsUrl()
  faviconUrl?: string;

  @ApiPropertyOptional({ example: "Skyline Heights - Luxury Homes" })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional({ example: "Discover luxury living at Skyline Heights" })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiPropertyOptional({ example: "https://example.com/og-image.jpg" })
  @IsOptional()
  @IsUrl()
  ogImageUrl?: string;

  @ApiPropertyOptional({ example: "GA-XXXXXXXXX" })
  @IsOptional()
  @IsString()
  googleAnalyticsId?: string;

  @ApiPropertyOptional({ example: "123456789" })
  @IsOptional()
  @IsString()
  facebookPixelId?: string;

  @ApiPropertyOptional({ example: "123456" })
  @IsOptional()
  @IsString()
  hotjarId?: string;

  @ApiPropertyOptional({ example: "body { font-family: Inter; }" })
  @IsOptional()
  @IsString()
  customCss?: string;

  @ApiPropertyOptional({ example: 'console.log("custom js");' })
  @IsOptional()
  @IsString()
  customJs?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enablePlanner?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableViewer?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableFurniture?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableAIAssistant?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableBudgetWidget?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableHistoryWidget?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enableRecommendations?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  enableWhatsApp?: boolean;

  @ApiPropertyOptional({ example: "+91 9876543210" })
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiPropertyOptional({ example: { host: "smtp.example.com", port: 587 } })
  @IsOptional()
  smtpConfig?: any;
}
