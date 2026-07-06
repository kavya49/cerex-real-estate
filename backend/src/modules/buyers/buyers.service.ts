import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBuyerDto, UpdateBuyerDto, BuyerQueryDto } from "./dto/buyer.dto";

@Injectable()
export class BuyersService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, createBuyerDto: CreateBuyerDto) {
    return this.prisma.buyer.create({
      data: { ...createBuyerDto, projectId },
    });
  }

  async findAll(projectId: string, query: BuyerQueryDto) {
    const { page = 1, limit = 20, search, layout } = query;
    const skip = (page - 1) * limit;

    const where: any = { projectId };
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }
    if (layout) where.selectedLayout = layout;

    const [buyers, total] = await Promise.all([
      this.prisma.buyer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { lastActiveAt: "desc" },
      }),
      this.prisma.buyer.count({ where }),
    ]);

    return {
      data: buyers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(projectId: string, id: string) {
    const buyer = await this.prisma.buyer.findFirst({
      where: { id, projectId },
    });
    if (!buyer) throw new NotFoundException("Buyer not found");
    return buyer;
  }

  async findByEmail(projectId: string, email: string) {
    const buyer = await this.prisma.buyer.findFirst({
      where: { projectId, email },
    });
    if (!buyer) throw new NotFoundException("Buyer not found");
    return buyer;
  }

  async update(projectId: string, id: string, updateBuyerDto: UpdateBuyerDto) {
    await this.findOne(projectId, id);
    return this.prisma.buyer.update({ where: { id }, data: updateBuyerDto });
  }

  async remove(projectId: string, id: string) {
    await this.findOne(projectId, id);
    return this.prisma.buyer.delete({ where: { id } });
  }
}
