import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EventListenerService {
  private readonly logger = new Logger(EventListenerService.name);

  constructor(private prisma: PrismaService) {}

  @OnEvent("event.recorded")
  async handleEventRecorded(payload: {
    projectId: string;
    buyerId?: string;
    sessionId?: string;
    name: string;
    properties?: any;
    timestamp: Date;
  }) {
    if (!payload.buyerId) return;

    try {
      await this.prisma.buyer.update({
        where: { id: payload.buyerId },
        data: {
          lastActiveAt: payload.timestamp,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to update buyer lastActiveAt: ${error.message}`,
        error.stack,
      );
    }
  }

  @OnEvent("planner.completed")
  async handlePlannerCompleted(payload: {
    projectId: string;
    buyerId: string;
    answers: any;
    recommendation: string;
    score: number;
    timestamp: Date;
  }) {
    // Buyer profile already updated in PlannerService, but we can log or do additional processing
    this.logger.log(
      `Planner completed for buyer ${payload.buyerId} in project ${payload.projectId} with recommendation ${payload.recommendation} (score: ${payload.score})`,
    );
  }

  @OnEvent("site_visit_requested")
  async handleSiteVisitRequested(payload: {
    projectId: string;
    buyerId: string;
    leadId: string;
    timestamp: Date;
  }) {
    this.logger.log(
      `Site visit requested by buyer ${payload.buyerId} for project ${payload.projectId}, lead ${payload.leadId}`,
    );
  }
}
