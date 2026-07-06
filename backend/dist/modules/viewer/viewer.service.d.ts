import { PrismaService } from "../../prisma/prisma.service";
export declare class ViewerService {
    private prisma;
    constructor(prisma: PrismaService);
    getModels(_projectId: string): Promise<{
        id: string;
        name: string;
        url: string;
    }[]>;
    getModel(_projectId: string, modelId: string): Promise<{
        id: string;
        name: string;
        url: string;
    }>;
}
