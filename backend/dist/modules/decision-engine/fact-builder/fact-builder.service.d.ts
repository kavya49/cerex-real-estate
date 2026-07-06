import { FactDto } from "../dto/decision-engine.dto";
export declare class FactBuilderService {
    buildFacts(snapshot: any): FactDto[];
    private parseHouseholdSize;
    private parseChildrenCount;
    private parseSeniorCount;
    private parsePetCount;
    private mapRemoteWorkDays;
    private parseTimeline;
    private getBudgetTier;
    private parseStyles;
    private derivePrimaryLifestyle;
}
