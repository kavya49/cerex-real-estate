import { Module } from "@nestjs/common";
import { FurnitureController } from "./furniture.controller";
import { FurnitureService } from "./furniture.service";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: [FurnitureService],
})
export class FurnitureModule {}
