import { Global, Module } from "@nestjs/common";
import { Queue } from "bullmq";
import { REDIS_CLIENT } from "../redis/redis.module";

export const BULL_QUEUES = {
  EMAIL: "email",
  WHATSAPP: "whatsapp",
  NOTIFICATIONS: "notifications",
  ANALYTICS: "analytics",
  AI_PROCESSING: "ai-processing",
  EXPORT: "export",
  WEBHOOK: "webhook",
} as const;

export type BullQueueName = (typeof BULL_QUEUES)[keyof typeof BULL_QUEUES];

const queueProviders = Object.values(BULL_QUEUES).map((name) => ({
  provide: `BULL_QUEUE_${name.toUpperCase()}`,
  useFactory: (redisClient: any) =>
    new Queue(name, { connection: redisClient }),
  inject: [REDIS_CLIENT],
}));

@Global()
@Module({
  providers: [...queueProviders],
  exports: [...queueProviders],
})
export class BullModule {}
