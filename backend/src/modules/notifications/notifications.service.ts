import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, body: any) {
    return this.prisma.notification.create({ data: { ...body, projectId } });
  }

  async list(projectId: string, query: any) {
    const { page = 1, limit = 20, status, type } = query;
    const where: any = { projectId };
    if (status) where.status = status;
    if (type) where.type = type;
    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.notification.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
