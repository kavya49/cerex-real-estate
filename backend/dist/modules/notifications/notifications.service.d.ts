import { PrismaService } from "../../prisma/prisma.service";
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, body: any): Promise<{
        id: string;
        type: string;
        createdAt: Date;
        content: string;
        projectId: string;
        buyerId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: string;
        channel: string;
        subject: string | null;
        sentAt: Date | null;
    }>;
    list(projectId: string, query: any): Promise<{
        data: {
            id: string;
            type: string;
            createdAt: Date;
            content: string;
            projectId: string;
            buyerId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            status: string;
            channel: string;
            subject: string | null;
            sentAt: Date | null;
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
}
