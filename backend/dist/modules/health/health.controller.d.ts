import { HealthCheckService, HealthCheckResult } from "@nestjs/terminus";
import { PrismaService } from "../../prisma/prisma.service";
export declare class HealthController {
    private health;
    private prisma;
    private redis;
    constructor(health: HealthCheckService, prisma: PrismaService, redis: any);
    check(): Promise<HealthCheckResult>;
    live(): Promise<HealthCheckResult>;
    ready(): Promise<HealthCheckResult>;
    private checkDatabase;
    private checkRedis;
}
