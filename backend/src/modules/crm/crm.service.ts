import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async createDeal(projectId: string, body: any) {
    // placeholder: store in a custom table or metadata
    return { id: "deal_" + Date.now(), ...body, projectId };
  }

  async listDeals(_projectId: string, _query: any) {
    return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
  }
}
