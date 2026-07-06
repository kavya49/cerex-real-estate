import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ViewerService {
  constructor(private prisma: PrismaService) {}

  async getModels(_projectId: string) {
    // Return available 3D models for the project
    return [
      {
        id: "modern-luxury",
        name: "Modern Luxury",
        url: "/models/modern-luxury.glb",
      },
      { id: "family", name: "Family Layout", url: "/models/family.glb" },
      { id: "office", name: "Home Office Layout", url: "/models/office.glb" },
      {
        id: "balcony",
        name: "Balcony Lifestyle Layout",
        url: "/models/balcony.glb",
      },
    ];
  }

  async getModel(_projectId: string, modelId: string) {
    const models = await this.getModels(_projectId);
    const model = models.find((m) => m.id === modelId);
    if (!model) throw new NotFoundException("Model not found");
    return model;
  }
}
