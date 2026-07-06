import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
  CreateDeveloperDto,
  UpdateDeveloperDto,
  DeveloperQueryDto,
} from "./dto/developer.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class DevelopersService {
  constructor(private prisma: PrismaService) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    const passwordHash = await bcrypt.hash(createDeveloperDto.password, 12);
    return this.prisma.developer.create({
      data: { ...createDeveloperDto, passwordHash },
    });
  }

  async findAll(query: DeveloperQueryDto) {
    const { page = 1, limit = 10, search, isActive } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ];
    }
    if (isActive !== undefined) where.isActive = isActive;

    const [developers, total] = await Promise.all([
      this.prisma.developer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          companyName: true,
          isActive: true,
          createdAt: true,
          _count: { select: { projects: true } },
        },
      }),
      this.prisma.developer.count({ where }),
    ]);

    return {
      data: developers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        logoUrl: true,
        website: true,
        phone: true,
        address: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { projects: true } },
      },
    });
    if (!developer) throw new NotFoundException("Developer not found");
    return developer;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    await this.findOne(id);
    return this.prisma.developer.update({
      where: { id },
      data: updateDeveloperDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.developer.delete({ where: { id } });
  }

  async updateStatus(id: string, isActive: boolean) {
    await this.findOne(id);
    return this.prisma.developer.update({ where: { id }, data: { isActive } });
  }
}
