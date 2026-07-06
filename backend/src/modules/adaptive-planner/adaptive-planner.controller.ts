import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AdaptivePlannerService } from "./adaptive-planner.service";
import {
  StartPlannerRequestDto,
  SubmitAnswerRequestDto,
  PlannerStateDto,
  PlannerResponseDto,
  QuestionnaireDto,
  QuestionnaireCreateDto,
  QuestionnaireUpdateDto,
  PlannerAnalyticsEventDto,
} from "./dto/adaptive-planner.dto";
import { BuyerSessionGuard } from "../../guards/buyer-session.guard";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import {
  CurrentBuyer,
  CurrentSession,
  ProjectId,
} from "../../decorators/custom.decorators";

@ApiTags("adaptive-planner")
@ApiBearerAuth()
@Controller("projects/:projectId/adaptive-planner")
@UseGuards(BuyerSessionGuard)
export class AdaptivePlannerController {
  constructor(
    private readonly adaptivePlannerService: AdaptivePlannerService,
  ) {}

  @Get("questionnaire/:questionnaireId?")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get questionnaire definition" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({
    name: "questionnaireId",
    required: false,
    description: "Questionnaire ID (optional, defaults to default-v1)",
  })
  @ApiResponse({
    status: 200,
    description: "Questionnaire definition",
    type: QuestionnaireDto,
  })
  async getQuestionnaire(
    @Param("projectId") projectId: string,
    @Param("questionnaireId") questionnaireId?: string,
  ): Promise<QuestionnaireDto> {
    return this.adaptivePlannerService.getQuestionnaire(questionnaireId);
  }

  @Post("start")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Start or resume planner session" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiResponse({
    status: 200,
    description: "Planner state",
    type: PlannerResponseDto,
  })
  async startPlanner(
    @ProjectId() projectId: string,
    @Body() request: StartPlannerRequestDto,
    @CurrentBuyer("id") buyerId: string,
    @CurrentSession("id") sessionId: string,
  ): Promise<PlannerResponseDto> {
    const state = await this.adaptivePlannerService.startPlanner(
      request,
      projectId,
      buyerId,
      sessionId,
    );
    const preview = state.mandatoryComplete
      ? this.adaptivePlannerService.generatePreview(state)
      : null;

    return { state, preview: preview || undefined };
  }

  @Post("answer")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Submit answer and get next question" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiResponse({
    status: 200,
    description: "Updated planner state",
    type: PlannerResponseDto,
  })
  async submitAnswer(
    @ProjectId() projectId: string,
    @Body() request: SubmitAnswerRequestDto,
    @CurrentBuyer("id") buyerId: string,
    @CurrentSession("id") sessionId: string,
  ): Promise<PlannerResponseDto> {
    const state = await this.adaptivePlannerService.submitAnswer(
      projectId,
      buyerId,
      sessionId,
      request,
    );
    const preview = state.mandatoryComplete
      ? this.adaptivePlannerService.generatePreview(state)
      : null;

    return { state, preview: preview || undefined };
  }

  @Post("resume/:sessionId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resume planner session" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "sessionId", description: "Session ID to resume" })
  @ApiResponse({
    status: 200,
    description: "Resumed planner state",
    type: PlannerResponseDto,
  })
  async resumePlanner(
    @ProjectId() projectId: string,
    @Param("sessionId") sessionId: string,
    @CurrentBuyer("id") buyerId: string,
  ): Promise<PlannerResponseDto> {
    const state = await this.adaptivePlannerService.resumePlanner(
      projectId,
      buyerId,
      sessionId,
    );
    const preview = state.mandatoryComplete
      ? this.adaptivePlannerService.generatePreview(state)
      : null;

    return { state, preview: preview || undefined };
  }

  @Post("analytics")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Track planner analytics event" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Analytics recorded" })
  async trackAnalytics(
    @ProjectId() projectId: string,
    @Body() request: PlannerAnalyticsEventDto,
    @CurrentBuyer("id") buyerId: string,
    @CurrentSession("id") sessionId: string,
    @Query("questionnaireId") questionnaireId: string,
  ): Promise<{ success: boolean }> {
    await this.adaptivePlannerService["logAnalytics"](
      projectId,
      questionnaireId,
      request as any,
      request.eventType,
      sessionId,
    );
    return { success: true };
  }
}

// Admin endpoints for questionnaire management
@ApiTags("admin/questionnaires")
@ApiBearerAuth()
@Controller("admin/questionnaires")
@UseGuards(JwtAuthGuard)
export class QuestionnaireAdminController {
  constructor(
    private readonly adaptivePlannerService: AdaptivePlannerService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create new questionnaire" })
  @ApiResponse({
    status: 201,
    description: "Questionnaire created",
    type: QuestionnaireDto,
  })
  async createQuestionnaire(
    @Body() request: QuestionnaireCreateDto,
  ): Promise<QuestionnaireDto> {
    throw new Error("Not implemented - use database migration");
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "List all questionnaires" })
  @ApiResponse({
    status: 200,
    description: "List of questionnaires",
    type: [QuestionnaireDto],
  })
  async listQuestionnaires(
    @Query("developerId") developerId?: string,
    @Query("projectId") projectId?: string,
  ): Promise<QuestionnaireDto[]> {
    return [];
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get questionnaire by ID" })
  @ApiParam({ name: "id", description: "Questionnaire ID" })
  @ApiResponse({
    status: 200,
    description: "Questionnaire details",
    type: QuestionnaireDto,
  })
  async getQuestionnaire(@Param("id") id: string): Promise<QuestionnaireDto> {
    return this.adaptivePlannerService.getQuestionnaire(id);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update questionnaire" })
  @ApiParam({ name: "id", description: "Questionnaire ID" })
  @ApiResponse({
    status: 200,
    description: "Updated questionnaire",
    type: QuestionnaireDto,
  })
  async updateQuestionnaire(
    @Param("id") id: string,
    @Body() request: QuestionnaireUpdateDto,
  ): Promise<QuestionnaireDto> {
    throw new Error("Not implemented - use database migration");
  }
}
