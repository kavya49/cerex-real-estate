export declare class CreateEventDto {
    name: string;
    properties?: any;
    buyerId?: string;
    sessionId?: string;
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
}
export declare class EventQueryDto {
    page?: number;
    limit?: number;
    name?: string;
    buyerId?: string;
    sessionId?: string;
}
