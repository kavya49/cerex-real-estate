import { StorageService } from "./storage.service";
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadUrl(projectId: string, body: {
        filename: string;
        contentType: string;
    }): Promise<{
        uploadUrl: string;
        key: string;
    }>;
    list(projectId: string, query: any): Promise<{
        data: {
            id: string;
            key: string;
            createdAt: Date;
            projectId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            bucket: string;
            originalName: string;
            mimeType: string;
            size: number;
            url: string;
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
}
