import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PlannerController } from "./planner.controller";
import { PlannerService } from "./planner.service";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule, EventEmitterModule],
  controllers: [PlannerController],
  providers: [PlannerService],
  exports: [PlannerService],
})
export class PlannerModule {}
