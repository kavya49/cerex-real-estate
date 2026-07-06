import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("dashboard")
@Controller("projects/:projectId/dashboard")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get dashboard overview" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async overview(@Param("projectId") projectId: string) {
    return this.dashboardService.overview(projectId);
  }

  @Get("funnel")
  @ApiOperation({ summary: "Get conversion funnel" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async funnel(@Param("projectId") projectId: string) {
    return this.dashboardService.funnel(projectId);
  }
}
