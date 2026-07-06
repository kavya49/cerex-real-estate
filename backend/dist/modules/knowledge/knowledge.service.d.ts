import { PrismaService } from "../../prisma/prisma.service";
import { CreateKnowledgeDto, UpdateKnowledgeDto, KnowledgeQueryDto } from "./dto/knowledge.dto";
export declare class KnowledgeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, dto: CreateKnowledgeDto): Promise<{
        priority: number;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        content: string;
        isPublished: boolean;
        projectId: string;
        category: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(projectId: string, query: KnowledgeQueryDto): Promise<{
        data: {
            priority: number;
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            content: string;
            isPublished: boolean;
            projectId: string;
            category: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(projectId: string, id: string): Promise<{
        priority: number;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        content: string;
        isPublished: boolean;
        projectId: string;
        category: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(projectId: string, id: string, dto: UpdateKnowledgeDto): Promise<{
        priority: number;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        content: string;
        isPublished: boolean;
        projectId: string;
        category: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(projectId: string, id: string): Promise<{
        priority: number;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        content: string;
        isPublished: boolean;
        projectId: string;
        category: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
