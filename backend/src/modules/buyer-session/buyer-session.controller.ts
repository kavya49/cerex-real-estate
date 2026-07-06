import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Ip,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { BuyerSessionService } from "./buyer-session.service";
import {
  CreateBuyerSessionDto,
  RefreshBuyerSessionDto,
  BuyerSessionResponseDto,
} from "./dto/buyer-session.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";
import { BuyerSessionGuard } from "../../guards/buyer-session.guard";

@ApiTags("buyer-session")
@Controller("projects/:projectId/buyer/session")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class BuyerSessionController {
  constructor(private readonly buyerSessionService: BuyerSessionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new anonymous buyer session" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async createSession(
    @Param("projectId") projectId: string,
    @Body() dto: CreateBuyerSessionDto,
    @Ip() ipAddress: string,
  ): Promise<BuyerSessionResponseDto> {
    return this.buyerSessionService.createSession(projectId, dto, ipAddress);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token using refresh token" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async refreshSession(
    @Param("projectId") projectId: string,
    @Body() dto: RefreshBuyerSessionDto,
  ): Promise<BuyerSessionResponseDto> {
    return this.buyerSessionService.refreshSession(projectId, dto);
  }

  @Get("me")
  @UseGuards(BuyerSessionGuard)
  @ApiOperation({ summary: "Get current buyer profile from session" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async getProfile(@Request() req: any) {
    const { buyer, session } = req;
    return {
      buyer: {
        id: buyer.id,
        email: buyer.email,
        name: buyer.name,
        familySize: buyer.familySize,
        children: buyer.children,
        workFromHome: buyer.workFromHome,
        lifestyle: buyer.lifestyle,
        timeline: buyer.timeline,
        style: buyer.style,
        budget: buyer.budget,
        selectedLayout: buyer.selectedLayout,
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
        lastSeenAt: session.lastSeenAt,
      },
    };
  }
}
