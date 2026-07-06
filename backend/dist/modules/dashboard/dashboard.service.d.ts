import { PrismaService } from "../../prisma/prisma.service";
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
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
