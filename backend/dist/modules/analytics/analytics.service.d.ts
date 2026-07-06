import { PrismaService } from "../../prisma/prisma.service";
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(projectId: string): Promise<{
        buyers: number;
        leads: number;
        events: number;
    }>;
    getFunnel(projectId: string): Promise<{
        visits: number;
        planners: number;
        experiences: number;
        summaries: number;
        leads: number;
    }>;
}
