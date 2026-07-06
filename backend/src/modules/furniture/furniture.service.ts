import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
  CreateFurnitureDto,
  UpdateFurnitureDto,
  FurnitureQueryDto,
} from "./dto/furniture.dto";

@Injectable()
export class FurnitureService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateFurnitureDto) {
    return this.prisma.furniture.create({ data: { ...dto, projectId } });
  }

  async findAll(projectId: string, query: FurnitureQueryDto) {
    const { page = 1, limit = 20, category, style, isActive } = query;
    const skip = (page - 1) * limit;
    const where: any = { projectId };
    if (category) where.category = category;
    if (style) where.style = style;
    if (isActive !== undefined) where.isActive = isActive;
    const [data, total] = await Promise.all([
      this.prisma.furniture.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.furniture.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(projectId: string, id: string) {
    const item = await this.prisma.furniture.findFirst({
      where: { id, projectId },
    });
    if (!item) throw new NotFoundException("Furniture not found");
    return item;
  }

  async update(projectId: string, id: string, dto: UpdateFurnitureDto) {
    await this.findOne(projectId, id);
    return this.prisma.furniture.update({ where: { id }, data: dto });
  }

  async remove(projectId: string, id: string) {
    await this.findOne(projectId, id);
    return this.prisma.furniture.delete({ where: { id } });
  }
}
