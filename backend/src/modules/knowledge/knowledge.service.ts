import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
  CreateKnowledgeDto,
  UpdateKnowledgeDto,
  KnowledgeQueryDto,
} from "./dto/knowledge.dto";

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateKnowledgeDto) {
    return this.prisma.knowledgeBase.create({ data: { ...dto, projectId } });
  }

  async findAll(projectId: string, query: KnowledgeQueryDto) {
    const { page = 1, limit = 20, category, isPublished } = query;
    const skip = (page - 1) * limit;
    const where: any = { projectId };
    if (category) where.category = category;
    if (isPublished !== undefined) where.isPublished = isPublished;
    const [data, total] = await Promise.all([
      this.prisma.knowledgeBase.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.knowledgeBase.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(projectId: string, id: string) {
    const item = await this.prisma.knowledgeBase.findFirst({
      where: { id, projectId },
    });
    if (!item) throw new NotFoundException("Article not found");
    return item;
  }

  async update(projectId: string, id: string, dto: UpdateKnowledgeDto) {
    await this.findOne(projectId, id);
    return this.prisma.knowledgeBase.update({ where: { id }, data: dto });
  }

  async remove(projectId: string, id: string) {
    await this.findOne(projectId, id);
    return this.prisma.knowledgeBase.delete({ where: { id } });
  }
}
