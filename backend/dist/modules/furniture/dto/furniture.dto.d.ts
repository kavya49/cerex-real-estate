export declare class CreateFurnitureDto {
    name: string;
    category: string;
    style: string;
    modelUrl: string;
    thumbnailUrl: string;
    dimensions: Record<string, number>;
    price?: number;
    metadata?: any;
}
export declare class UpdateFurnitureDto {
    name?: string;
    category?: string;
    style?: string;
    modelUrl?: string;
    thumbnailUrl?: string;
    dimensions?: Record<string, number>;
    price?: number;
    isActive?: boolean;
}
export declare class FurnitureQueryDto {
    page?: number;
    limit?: number;
    category?: string;
    style?: string;
    isActive?: boolean;
}
