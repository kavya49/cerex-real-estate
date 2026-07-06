import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { SummaryService } from "./summary.service";
import { BuyerSessionGuard } from "../../guards/buyer-session.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("summary")
@Controller("projects/:projectId/summary")
@UseGuards(BuyerSessionGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  @ApiOperation({ summary: "Get buyer summary for project" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async getSummary(@Param("projectId") projectId: string, @Request() req: any) {
    const buyerId = req.buyer.id;
    return this.summaryService.getSummary(projectId, buyerId);
  }
}
