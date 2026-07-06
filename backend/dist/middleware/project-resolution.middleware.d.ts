import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";
export interface ProjectContext {
    projectId: string;
    projectSlug: string;
    developerId: string;
}
declare module "express" {
    interface Request {
        project?: ProjectContext;
    }
}
export declare class ProjectResolutionMiddleware implements NestMiddleware {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    use(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
