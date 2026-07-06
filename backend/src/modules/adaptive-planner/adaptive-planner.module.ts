import { Module } from "@nestjs/common";
import { AdaptivePlannerController } from "./adaptive-planner.controller";
import { AdaptivePlannerService } from "./adaptive-planner.service";
import { DecisionEngineModule } from "../decision-engine/decision-engine.module";

@Module({
  imports: [DecisionEngineModule],
  controllers: [AdaptivePlannerController],
  providers: [AdaptivePlannerService],
  exports: [AdaptivePlannerService],
})
export class AdaptivePlannerModule {}
