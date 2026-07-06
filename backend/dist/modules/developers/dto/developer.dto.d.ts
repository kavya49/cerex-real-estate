export declare class CreateDeveloperDto {
    name: string;
    email: string;
    password: string;
    companyName?: string;
    logoUrl?: string;
    website?: string;
    phone?: string;
    address?: string;
}
export declare class UpdateDeveloperDto {
    name?: string;
    companyName?: string;
    logoUrl?: string;
    website?: string;
    phone?: string;
    address?: string;
    isActive?: boolean;
}
export declare class DeveloperQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
}
