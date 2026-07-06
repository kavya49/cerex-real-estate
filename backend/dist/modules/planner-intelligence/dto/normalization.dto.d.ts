export declare class NormalizePlannerRequestDto {
    answers: Record<string, any>;
    projectId?: string;
    buyerId?: string;
    sessionId?: string;
}
export declare class HouseholdNormalizedDto {
    adults: number;
    children: number;
    total: number;
    hasChildren: boolean;
    childrenAgeRanges: string[];
}
export declare class LifestyleNormalizedDto {
    primary: string;
    workFromHome: string;
    moveInMonths: number;
    prefersQuiet: boolean;
}
export declare class DesignNormalizedDto {
    style: string[];
    explicit: boolean;
    colorPalette: string;
}
export declare class FinancialNormalizedDto {
    budgetMinorUnits: number;
    currency: string;
    explicit: boolean;
}
export declare class PreferencesNormalizedDto {
    prefersBalcony: boolean;
    needsHomeOffice: boolean;
    preferredFloorLevel: string;
}
export declare class NormalizedPlannerResultDto {
    household: HouseholdNormalizedDto;
    lifestyle: LifestyleNormalizedDto;
    design: DesignNormalizedDto;
    financial: FinancialNormalizedDto;
    preferences: PreferencesNormalizedDto;
    rawAnswers: Record<string, any>;
    version: number;
    normalizedAt: Date;
}
export declare class NormalizePlannerResponseDto {
    data: NormalizedPlannerResultDto;
    success: boolean;
    warnings?: string[];
}
