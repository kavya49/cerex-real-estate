import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { CrmService } from "./crm.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("crm")
@Controller("projects/:projectId/crm")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post("deals")
  @ApiOperation({ summary: "Create deal" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async createDeal(@Param("projectId") projectId: string, @Body() body: any) {
    return this.crmService.createDeal(projectId, body);
  }

  @Get("deals")
  @ApiOperation({ summary: "List deals" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async listDeals(@Param("projectId") projectId: string, @Query() query: any) {
    return this.crmService.listDeals(projectId, query);
  }
}
