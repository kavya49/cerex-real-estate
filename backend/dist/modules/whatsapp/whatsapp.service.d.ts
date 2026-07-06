import { PrismaService } from "../../prisma/prisma.service";
export declare class WhatsappService {
    private prisma;
    constructor(prisma: PrismaService);
    sendMessage(projectId: string, to: string, template: string, _params?: any[]): Promise<{
        success: boolean;
        messageId: string;
        to: string;
        template: string;
    }>;
    listTemplates(projectId: string, query: any): Promise<{
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            category: string;
            status: string;
            language: string;
            header: string | null;
            body: string;
            footer: string | null;
            buttons: import("@prisma/client/runtime/library").JsonValue | null;
            variables: import("@prisma/client/runtime/library").JsonValue | null;
            templateId: string | null;
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
}
