import { FurnitureService } from "./furniture.service";
import { CreateFurnitureDto, UpdateFurnitureDto, FurnitureQueryDto } from "./dto/furniture.dto";
export declare class FurnitureController {
    private readonly furnitureService;
    constructor(furnitureService: FurnitureService);
    create(projectId: string, dto: CreateFurnitureDto): Promise<{
        name: string;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        style: string;
        projectId: string;
        category: string;
        modelUrl: string;
        thumbnailUrl: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue;
        price: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(projectId: string, query: FurnitureQueryDto): Promise<{
        data: {
            name: string;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            style: string;
            projectId: string;
            category: string;
            modelUrl: string;
            thumbnailUrl: string;
            dimensions: import("@prisma/client/runtime/library").JsonValue;
            price: number | null;
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
        name: string;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        style: string;
        projectId: string;
        category: string;
        modelUrl: string;
        thumbnailUrl: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue;
        price: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(projectId: string, id: string, dto: UpdateFurnitureDto): Promise<{
        name: string;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        style: string;
        projectId: string;
        category: string;
        modelUrl: string;
        thumbnailUrl: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue;
        price: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(projectId: string, id: string): Promise<{
        name: string;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        style: string;
        projectId: string;
        category: string;
        modelUrl: string;
        thumbnailUrl: string;
        dimensions: import("@prisma/client/runtime/library").JsonValue;
        price: number | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
