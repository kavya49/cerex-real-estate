import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("analytics")
@Controller("projects/:projectId/analytics")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get analytics overview" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async overview(@Param("projectId") projectId: string) {
    return this.analyticsService.getOverview(projectId);
  }

  @Get("funnel")
  @ApiOperation({ summary: "Get conversion funnel" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async funnel(@Param("projectId") projectId: string) {
    return this.analyticsService.getFunnel(projectId);
  }
}
