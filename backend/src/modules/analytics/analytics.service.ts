import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(projectId: string) {
    const [buyers, leads, events] = await Promise.all([
      this.prisma.buyer.count({ where: { projectId } }),
      this.prisma.lead.count({ where: { projectId } }),
      this.prisma.event.count({ where: { projectId } }),
    ]);
    return { buyers, leads, events };
  }

  async getFunnel(projectId: string) {
    const [visits, planners, experiences, summaries, leads] = await Promise.all(
      [
        this.prisma.event.count({ where: { projectId, name: "page_view" } }),
        this.prisma.event.count({
          where: { projectId, name: "planner_started" },
        }),
        this.prisma.event.count({
          where: { projectId, name: "experience_viewed" },
        }),
        this.prisma.event.count({
          where: { projectId, name: "summary_viewed" },
        }),
        this.prisma.lead.count({ where: { projectId } }),
      ],
    );
    return { visits, planners, experiences, summaries, leads };
  }
}
