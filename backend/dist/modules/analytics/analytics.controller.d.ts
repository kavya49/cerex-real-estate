import { AnalyticsService } from "./analytics.service";
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    overview(projectId: string): Promise<{
        buyers: number;
        leads: number;
        events: number;
    }>;
    funnel(projectId: string): Promise<{
        visits: number;
        planners: number;
        experiences: number;
        summaries: number;
        leads: number;
    }>;
}
