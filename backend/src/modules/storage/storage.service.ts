import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async getUploadUrl(
    projectId: string,
    filename: string,
    _contentType: string,
  ) {
    // placeholder: return dummy signed URL
    return {
      uploadUrl: `https://example.com/upload/${projectId}/${filename}`,
      key: `${projectId}/${filename}`,
    };
  }

  async list(projectId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const where = { projectId };
    const [data, total] = await Promise.all([
      this.prisma.storageObject.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.storageObject.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
