import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEventDto, EventQueryDto } from "./dto/event.dto";

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(projectId: string, dto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: { ...dto, projectId },
    });

    this.eventEmitter.emit("event.recorded", {
      projectId,
      buyerId: dto.buyerId,
      sessionId: dto.sessionId,
      name: dto.name,
      properties: dto.properties,
      timestamp: event.timestamp,
    });

    return event;
  }

  async findAll(projectId: string, query: EventQueryDto) {
    const { page = 1, limit = 50, name, buyerId, sessionId } = query;
    const skip = (page - 1) * limit;
    const where: any = { projectId };
    if (name) where.name = name;
    if (buyerId) where.buyerId = buyerId;
    if (sessionId) where.sessionId = sessionId;
    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { timestamp: "desc" },
      }),
      this.prisma.event.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
