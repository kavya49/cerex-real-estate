import { PrismaService } from "../../prisma/prisma.service";
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from "./dto/lead.dto";
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, dto: CreateLeadDto): Promise<{
        name: string;
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        score: number;
        buyerId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        intent: string;
        source: string | null;
        status: string;
        assignedTo: string | null;
    }>;
    findAll(projectId: string, query: LeadQueryDto): Promise<{
        data: {
            name: string;
            email: string;
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            score: number;
            buyerId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            intent: string;
            source: string | null;
            status: string;
            assignedTo: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(projectId: string, id: string): Promise<{
        name: string;
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        score: number;
        buyerId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        intent: string;
        source: string | null;
        status: string;
        assignedTo: string | null;
    }>;
    update(projectId: string, id: string, dto: UpdateLeadDto): Promise<{
        name: string;
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        score: number;
        buyerId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        intent: string;
        source: string | null;
        status: string;
        assignedTo: string | null;
    }>;
    remove(projectId: string, id: string): Promise<{
        name: string;
        email: string;
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        score: number;
        buyerId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        intent: string;
        source: string | null;
        status: string;
        assignedTo: string | null;
    }>;
}
