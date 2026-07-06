import { Module } from "@nestjs/common";
import { PlannerIntelligenceController } from "./planner-intelligence.controller";
import { NormalizationService } from "./normalization.service";
import { NormalizationValidator } from "./normalization.validator";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PlannerIntelligenceController],
  providers: [NormalizationService, NormalizationValidator],
  exports: [NormalizationService, NormalizationValidator],
})
export class PlannerIntelligenceModule {}
