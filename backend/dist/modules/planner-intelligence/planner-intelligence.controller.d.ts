import { NormalizationService } from "./normalization.service";
import { NormalizationValidator } from "./normalization.validator";
import { NormalizePlannerRequestDto, NormalizePlannerResponseDto } from "./dto/normalization.dto";
export declare class PlannerIntelligenceController {
    private readonly normalizationService;
    private readonly validator;
    constructor(normalizationService: NormalizationService, validator: NormalizationValidator);
    normalize(request: NormalizePlannerRequestDto, req: any): Promise<NormalizePlannerResponseDto>;
}
