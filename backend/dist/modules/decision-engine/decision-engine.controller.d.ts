import { DecisionEngineService } from "./decision-engine.service";
import { EvaluateDecisionRequestDto, EvaluateDecisionResponseDto } from "./dto/decision-engine.dto";
export declare class DecisionEngineController {
    private readonly decisionEngineService;
    constructor(decisionEngineService: DecisionEngineService);
    evaluate(request: EvaluateDecisionRequestDto): Promise<EvaluateDecisionResponseDto>;
}
