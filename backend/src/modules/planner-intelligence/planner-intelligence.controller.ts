import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { NormalizationService } from "./normalization.service";
import { NormalizationValidator } from "./normalization.validator";
import {
  NormalizePlannerRequestDto,
  NormalizePlannerResponseDto,
} from "./dto/normalization.dto";
import { BuyerSessionGuard } from "../../guards/buyer-session.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("planner-intelligence")
@Controller("projects/:projectId/planner")
@UseGuards(BuyerSessionGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class PlannerIntelligenceController {
  constructor(
    private readonly normalizationService: NormalizationService,
    private readonly validator: NormalizationValidator,
  ) {}

  @Post("normalize")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Normalize raw planner answers into structured normalized data",
  })
  @ApiBody({ type: NormalizePlannerRequestDto })
  async normalize(
    @Body() request: NormalizePlannerRequestDto,
    @Request() req: any,
  ): Promise<NormalizePlannerResponseDto> {
    // Enrich request with context from guards
    const enrichedRequest = {
      ...request,
      projectId: request.projectId || req.project?.projectId,
      buyerId: request.buyerId || req.buyer?.id,
      sessionId: request.sessionId || req.session?.id,
    };

    this.validator.validate(enrichedRequest);
    return this.normalizationService.normalize(enrichedRequest);
  }
}
