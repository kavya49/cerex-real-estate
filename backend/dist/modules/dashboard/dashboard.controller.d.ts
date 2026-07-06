import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    overview(projectId: string): Promise<{
        buyers: number;
        leads: number;
        events: number;
        apartments: number;
    }>;
    funnel(projectId: string): Promise<{
        visits: number;
        planner: number;
        experience: number;
        summary: number;
        leads: number;
    }>;
}
