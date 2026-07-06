import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateProjectConfigDto } from "./dto/project-config.dto";

@Injectable()
export class ProjectConfigService {
  constructor(private prisma: PrismaService) {}

  async findOne(projectId: string) {
    let config = await this.prisma.projectConfig.findUnique({
      where: { projectId },
    });
    if (!config) {
      config = await this.prisma.projectConfig.create({ data: { projectId } });
    }
    return config;
  }

  async update(
    projectId: string,
    updateProjectConfigDto: UpdateProjectConfigDto,
  ) {
    return this.prisma.projectConfig.upsert({
      where: { projectId },
      update: updateProjectConfigDto,
      create: { projectId, ...updateProjectConfigDto },
    });
  }
}
