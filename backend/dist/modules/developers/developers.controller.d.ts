import { DevelopersService } from "./developers.service";
import { CreateDeveloperDto, UpdateDeveloperDto, DeveloperQueryDto } from "./dto/developer.dto";
export declare class DevelopersController {
    private readonly developersService;
    constructor(developersService: DevelopersService);
    create(createDeveloperDto: CreateDeveloperDto): Promise<{
        name: string;
        email: string;
        isActive: boolean;
        id: string;
        companyName: string | null;
        phone: string | null;
        refreshToken: string | null;
        logoUrl: string | null;
        website: string | null;
        address: string | null;
        passwordHash: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(query: DeveloperQueryDto): Promise<{
        data: {
            name: string;
            email: string;
            isActive: boolean;
            id: string;
            companyName: string | null;
            createdAt: Date;
            _count: {
                projects: number;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        isActive: boolean;
        id: string;
        companyName: string | null;
        phone: string | null;
        logoUrl: string | null;
        website: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            projects: number;
        };
    }>;
    update(id: string, updateDeveloperDto: UpdateDeveloperDto): Promise<{
        name: string;
        email: string;
        isActive: boolean;
        id: string;
        companyName: string | null;
        phone: string | null;
        refreshToken: string | null;
        logoUrl: string | null;
        website: string | null;
        address: string | null;
        passwordHash: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        isActive: boolean;
        id: string;
        companyName: string | null;
        phone: string | null;
        refreshToken: string | null;
        logoUrl: string | null;
        website: string | null;
        address: string | null;
        passwordHash: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, isActive: boolean): Promise<{
        name: string;
        email: string;
        isActive: boolean;
        id: string;
        companyName: string | null;
        phone: string | null;
        refreshToken: string | null;
        logoUrl: string | null;
        website: string | null;
        address: string | null;
        passwordHash: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
