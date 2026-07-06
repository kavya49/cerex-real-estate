import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from "./dto/project.dto";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, developerId: string) {
    const slug = this.generateSlug(createProjectDto.name);
    const uniqueSlug = await this.ensureUniqueSlug(slug);

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        slug: uniqueSlug,
        developerId,
      },
      include: { config: true },
    });

    return project;
  }

  async findAll(query: ProjectQueryDto, developerId: string) {
    const { page = 1, limit = 10, search, isActive, isPublished } = query;
    const skip = (page - 1) * limit;

    const where: any = { developerId };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (isActive !== undefined) where.isActive = isActive;
    if (isPublished !== undefined) where.isPublished = isPublished;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          config: true,
          _count: { select: { apartments: true, buyers: true, leads: true } },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data: projects,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        config: true,
        developer: { select: { id: true, name: true, email: true } },
      },
    });
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { config: true },
    });
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);
    const slug = updateProjectDto.name
      ? this.generateSlug(updateProjectDto.name)
      : undefined;
    const uniqueSlug = slug ? await this.ensureUniqueSlug(slug, id) : undefined;

    return this.prisma.project.update({
      where: { id },
      data: { ...updateProjectDto, slug: uniqueSlug },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }

  async publish(id: string) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  async unpublish(id: string) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: { isPublished: false },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  private async ensureUniqueSlug(
    slug: string,
    excludeId?: string,
  ): Promise<string> {
    let uniqueSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await this.prisma.project.findUnique({
        where: { slug: uniqueSlug },
      });
      if (!existing || existing.id === excludeId) break;
      uniqueSlug = `${slug}-${counter++}`;
    }
    return uniqueSlug;
  }
}
