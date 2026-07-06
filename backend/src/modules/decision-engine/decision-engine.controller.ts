import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DecisionEngineService } from "./decision-engine.service";
import {
  EvaluateDecisionRequestDto,
  EvaluateDecisionResponseDto,
} from "./dto/decision-engine.dto";

@ApiTags("decision-engine")
@Controller("decision-engine")
export class DecisionEngineController {
  constructor(private readonly decisionEngineService: DecisionEngineService) {}

  @Post("evaluate")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Evaluate decision engine for a buyer snapshot" })
  @ApiResponse({
    status: 200,
    description: "Decision evaluation result",
    type: EvaluateDecisionResponseDto,
  })
  async evaluate(
    @Body() request: EvaluateDecisionRequestDto,
  ): Promise<EvaluateDecisionResponseDto> {
    return this.decisionEngineService.evaluate(request.snapshot);
  }
}
