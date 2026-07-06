import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { PlannerService } from "./planner.service";
import { PlannerAnswersDto } from "./dto/planner.dto";
import { BuyerSessionGuard } from "../../guards/buyer-session.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("planner")
@Controller("projects/:projectId/planner")
@UseGuards(BuyerSessionGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post("answers")
  @ApiOperation({ summary: "Submit planner answers and get recommendation" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async submitAnswers(
    @Param("projectId") projectId: string,
    @Body() plannerAnswersDto: PlannerAnswersDto,
    @Request() req: any,
  ) {
    const buyerId = req.buyer.id;
    return this.plannerService.processAnswers(
      projectId,
      buyerId,
      plannerAnswersDto,
    );
  }

  @Get("layouts")
  @ApiOperation({ summary: "Get available layouts for project" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async getLayouts(@Param("projectId") projectId: string) {
    return this.plannerService.getLayouts(projectId);
  }

  @Post("recommendation")
  @ApiOperation({ summary: "Get AI recommendation based on answers" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async getRecommendation(
    @Param("projectId") projectId: string,
    @Body() plannerAnswersDto: PlannerAnswersDto,
  ) {
    return this.plannerService.getRecommendation(projectId, plannerAnswersDto);
  }
}
