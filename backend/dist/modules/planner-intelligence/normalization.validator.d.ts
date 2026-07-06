import { NormalizePlannerRequestDto } from "./dto/normalization.dto";
export declare class NormalizationValidator {
    private readonly requiredFields;
    validate(request: NormalizePlannerRequestDto): boolean;
}
