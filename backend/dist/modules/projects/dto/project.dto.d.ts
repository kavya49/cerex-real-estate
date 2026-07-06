export declare class CreateProjectDto {
    name: string;
    description?: string;
    tagline?: string;
    logoUrl?: string;
    heroImageUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    possessionDate?: Date;
}
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    tagline?: string;
    logoUrl?: string;
    heroImageUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    possessionDate?: Date;
    isActive?: boolean;
}
export declare class ProjectQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    isPublished?: boolean;
}
