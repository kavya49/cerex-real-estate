import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from "./dto/lead.dto";

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: { ...dto, projectId } });
  }

  async findAll(projectId: string, query: LeadQueryDto) {
    const { page = 1, limit = 20, status } = query;
    const skip = (page - 1) * limit;
    const where: any = { projectId };
    if (status) where.status = status;
    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.lead.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(projectId: string, id: string) {
    const lead = await this.prisma.lead.findFirst({ where: { id, projectId } });
    if (!lead) throw new NotFoundException("Lead not found");
    return lead;
  }

  async update(projectId: string, id: string, dto: UpdateLeadDto) {
    await this.findOne(projectId, id);
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  async remove(projectId: string, id: string) {
    await this.findOne(projectId, id);
    return this.prisma.lead.delete({ where: { id } });
  }
}
