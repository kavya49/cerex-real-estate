import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
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

@Injectable()
export class ProjectResolutionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProjectResolutionMiddleware.name);

  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const projectId = req.headers["x-project-id"] as string;
    const projectSlug = req.headers["x-project-slug"] as string;

    if (!projectId && !projectSlug) {
      this.logger.warn("No project context provided in request");
      return next();
    }

    try {
      let project;
      if (projectId) {
        project = await this.prisma.project.findUnique({
          where: { id: projectId },
          select: {
            id: true,
            slug: true,
            developerId: true,
            isActive: true,
            isPublished: true,
          },
        });
      } else if (projectSlug) {
        project = await this.prisma.project.findUnique({
          where: { slug: projectSlug },
          select: {
            id: true,
            slug: true,
            developerId: true,
            isActive: true,
            isPublished: true,
          },
        });
      }

      if (!project) {
        this.logger.warn(`Project not found: ${projectId || projectSlug}`);
        return next();
      }

      if (!project.isActive) {
        this.logger.warn(`Project inactive: ${project.id}`);
        return res.status(403).json({
          statusCode: 403,
          message: "Project is not active",
          error: "Forbidden",
        });
      }

      req.project = {
        projectId: project.id,
        projectSlug: project.slug,
        developerId: project.developerId,
      };

      res.setHeader("X-Project-ID", project.id);
      res.setHeader("X-Project-Slug", project.slug);

      next();
    } catch (error) {
      this.logger.error(
        `Project resolution error: ${error.message}`,
        error.stack,
      );
      next(error);
    }
  }
}
