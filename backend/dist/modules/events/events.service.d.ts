import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEventDto, EventQueryDto } from "./dto/event.dto";
export declare class EventsService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    create(projectId: string, dto: CreateEventDto): Promise<{
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
