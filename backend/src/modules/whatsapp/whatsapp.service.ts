import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class WhatsappService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(
    projectId: string,
    to: string,
    template: string,
    _params?: any[],
  ) {
    // placeholder for Meta Cloud API integration
    return { success: true, messageId: `msg_${Date.now()}`, to, template };
  }

  async listTemplates(projectId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const where = { projectId };
    const [data, total] = await Promise.all([
      this.prisma.whatsAppTemplate.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.whatsAppTemplate.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
