import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async overview(projectId: string) {
    const [buyers, leads, events, apartments] = await Promise.all([
      this.prisma.buyer.count({ where: { projectId } }),
      this.prisma.lead.count({ where: { projectId } }),
      this.prisma.event.count({ where: { projectId } }),
      this.prisma.apartment.count({ where: { projectId } }),
    ]);
    return { buyers, leads, events, apartments };
  }

  async funnel(projectId: string) {
    const [visits, planner, experience, summary, leads] = await Promise.all([
      this.prisma.event.count({ where: { projectId, name: "page_view" } }),
      this.prisma.event.count({
        where: { projectId, name: "planner_started" },
      }),
      this.prisma.event.count({
        where: { projectId, name: "experience_viewed" },
      }),
      this.prisma.event.count({ where: { projectId, name: "summary_viewed" } }),
      this.prisma.lead.count({ where: { projectId } }),
    ]);
    return { visits, planner, experience, summary, leads };
  }
}
