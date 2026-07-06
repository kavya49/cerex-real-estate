import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { EventListenerService } from "./event-listener.service";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService, EventListenerService],
  exports: [EventsService],
})
export class EventsModule {}
