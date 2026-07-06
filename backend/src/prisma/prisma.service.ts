import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: "stdout", level: "query" },
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "warn" },
        { emit: "stdout", level: "error" },
      ],
      errorFormat: "pretty",
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("🔌 Database connected successfully");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("🔌 Database disconnected");
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot clean database in production");
    }
    const modelNames = [
      "developer",
      "project",
      "projectConfig",
      "apartment",
      "buyer",
      "lead",
      "event",
      "knowledgeBase",
      "furniture",
      "notification",
      "whatsAppTemplate",
      "storageObject",
      "user",
    ];
    for (const modelName of modelNames) {
      const model = (this as any)[modelName];
      if (model?.deleteMany) {
        await model.deleteMany();
      }
    }
  }
}
