import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { ViewerService } from "./viewer.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("viewer")
@Controller("projects/:projectId/viewer")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class ViewerController {
  constructor(private readonly viewerService: ViewerService) {}

  @Get("models")
  @ApiOperation({ summary: "Get available 3Disp 3D models for project" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async getModels(@Param("projectId") projectId: string) {
    return this.viewerService.getModels(projectId);
  }

  @Get("models/:modelId")
  @ApiOperation({ summary: "Get 3D model by ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "modelId", description: "Model ID" })
  async getModel(
    @Param("projectId") projectId: string,
    @Param("modelId") modelId: string,
  ) {
    return this.viewerService.getModel(projectId, modelId);
  }
}
