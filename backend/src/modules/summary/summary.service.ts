import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { SummaryResponseDto } from "./dto/summary.dto";

@Injectable()
export class SummaryService {
  constructor(private prisma: PrismaService) {}

  async getSummary(
    projectId: string,
    buyerId: string,
  ): Promise<SummaryResponseDto> {
    const buyer = await this.prisma.buyer.findFirst({
      where: { id: buyerId, projectId },
      include: {
        events: { orderBy: { timestamp: "desc" }, take: 50 },
        leads: {
          where: { projectId },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!buyer) {
      throw new NotFoundException("Buyer not found");
    }

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true, name: true, slug: true },
    });

    const layout = buyer.selectedLayout
      ? this.getLayoutMeta(buyer.selectedLayout)
      : null;

    return {
      buyer: {
        id: buyer.id,
        email: buyer.email,
        name: buyer.name,
        familySize: buyer.familySize,
        children: buyer.children,
        workFromHome: buyer.workFromHome,
        lifestyle: buyer.lifestyle,
        timeline: buyer.timeline,
        style: buyer.style,
        budget: buyer.budget,
        selectedLayout: buyer.selectedLayout,
        lastActiveAt: buyer.lastActiveAt,
      },
      layout,
      events: buyer.events.map((e) => ({
        id: e.id,
        name: e.name,
        properties: e.properties,
        timestamp: e.timestamp,
      })),
      lead: buyer.leads[0]
        ? {
            id: buyer.leads[0].id,
            name: buyer.leads[0].name,
            phone: buyer.leads[0].phone,
            email: buyer.leads[0].email,
            intent: buyer.leads[0].intent,
            status: buyer.leads[0].status,
            createdAt: buyer.leads[0].createdAt,
          }
        : null,
      project: project!,
    };
  }

  private getLayoutMeta(key: string) {
    const layouts: Record<string, any> = {
      "modern-luxury": {
        key: "modern-luxury",
        name: "Modern Luxury",
        tag: "Premium · City-facing",
        sqft: "1,720 sq ft",
        tower: "Tower B",
        floor: "14th Floor",
      },
      family: {
        key: "family",
        name: "Family Layout",
        tag: "Spacious · Kid-friendly",
        sqft: "1,820 sq ft",
        tower: "Tower A",
        floor: "08th Floor",
      },
      office: {
        key: "office",
        name: "Home Office Layout",
        tag: "WFH-optimized · Quiet wing",
        sqft: "1,680 sq ft",
        tower: "Tower C",
        floor: "12th Floor",
      },
      balcony: {
        key: "balcony",
        name: "Balcony Lifestyle Layout",
        tag: "Wide deck · Skyline view",
        sqft: "1,780 sq ft",
        tower: "Tower B",
        floor: "22nd Floor",
      },
    };
    return layouts[key] || null;
  }
}
