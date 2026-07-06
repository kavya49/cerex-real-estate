import { PrismaService } from "../../prisma/prisma.service";
import { NormalizePlannerRequestDto } from "./dto/normalization.dto";
export declare class NormalizationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    normalize(request: NormalizePlannerRequestDto): Promise<{
        data: {
            household: {
                adults: number;
                children: number;
                total: number;
                hasChildren: boolean;
                childrenAgeRanges: never[];
            };
            lifestyle: {
                primary: string;
                workFromHome: string;
                moveInMonths: number;
                prefersQuiet: boolean;
            };
            design: {
                style: string[];
                explicit: boolean;
                colorPalette: string;
            };
            financial: {
                budgetMinorUnits: number;
                currency: string;
                explicit: boolean;
            };
            preferences: {
                prefersBalcony: boolean;
                needsHomeOffice: boolean;
                preferredFloorLevel: string;
            };
            rawAnswers: Record<string, any>;
            version: number;
            normalizedAt: Date;
        };
        success: boolean;
        warnings: string[] | undefined;
    }>;
    private buildFacts;
    private buildAttributes;
    private buildPriorityScores;
    private buildConstraints;
    private inferMaterialPreference;
    private inferLightingPreference;
    private normalizeHousehold;
    private normalizeLifestyle;
    private normalizeDesign;
    private inferColorPalette;
    private normalizeFinancial;
    private normalizePreferences;
}
