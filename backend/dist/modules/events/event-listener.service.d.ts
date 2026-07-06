import { PrismaService } from "../../prisma/prisma.service";
export declare class EventListenerService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleEventRecorded(payload: {
        projectId: string;
        buyerId?: string;
        sessionId?: string;
        name: string;
        properties?: any;
        timestamp: Date;
    }): Promise<void>;
    handlePlannerCompleted(payload: {
        projectId: string;
        buyerId: string;
        answers: any;
        recommendation: string;
        score: number;
        timestamp: Date;
    }): Promise<void>;
    handleSiteVisitRequested(payload: {
        projectId: string;
        buyerId: string;
        leadId: string;
        timestamp: Date;
    }): Promise<void>;
}
