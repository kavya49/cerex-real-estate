import { Controller, Get, Put, Body, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { ProjectConfigService } from "./project-config.service";
import { UpdateProjectConfigDto } from "./dto/project-config.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("project-config")
@Controller("projects/:projectId/config")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class ProjectConfigController {
  constructor(private readonly projectConfigService: ProjectConfigService) {}

  @Get()
  @ApiOperation({ summary: "Get project configuration" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findOne(@Param("projectId") projectId: string) {
    return this.projectConfigService.findOne(projectId);
  }

  @Put()
  @ApiOperation({ summary: "Update project configuration" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async update(
    @Param("projectId") projectId: string,
    @Body() updateProjectConfigDto: UpdateProjectConfigDto,
  ) {
    return this.projectConfigService.update(projectId, updateProjectConfigDto);
  }
}
