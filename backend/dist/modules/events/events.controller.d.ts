import { EventsService } from "./events.service";
import { CreateEventDto, EventQueryDto } from "./dto/event.dto";
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(projectId: string, createEventDto: CreateEventDto): Promise<{
        name: string;
        timestamp: Date;
        id: string;
        properties: import("@prisma/client/runtime/library").JsonValue | null;
        projectId: string;
        buyerId: string | null;
        ipAddress: string | null;
        sessionId: string | null;
        userAgent: string | null;
        referrer: string | null;
    }>;
    findAll(projectId: string, query: EventQueryDto): Promise<{
        data: {
            name: string;
            timestamp: Date;
            id: string;
            properties: import("@prisma/client/runtime/library").JsonValue | null;
            projectId: string;
            buyerId: string | null;
            ipAddress: string | null;
            sessionId: string | null;
            userAgent: string | null;
            referrer: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
