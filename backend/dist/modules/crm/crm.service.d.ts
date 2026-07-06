import { PrismaService } from "../../prisma/prisma.service";
export declare class CrmService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(projectId: string, body: any): Promise<any>;
    listDeals(_projectId: string, _query: any): Promise<{
        data: never[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
