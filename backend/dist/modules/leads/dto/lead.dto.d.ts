export declare class CreateLeadDto {
    name: string;
    phone: string;
    email: string;
    intent: string;
    source?: string;
    metadata?: any;
}
export declare class UpdateLeadDto {
    name?: string;
    phone?: string;
    email?: string;
    intent?: string;
    status?: string;
    score?: number;
    assignedTo?: string;
}
export declare class LeadQueryDto {
    page?: number;
    limit?: number;
    status?: string;
}
