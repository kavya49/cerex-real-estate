import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from "./dto/project.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";
import { CurrentUser } from "../../decorators/custom.decorators";

@ApiTags("projects")
@Controller("projects")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new project" })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser("sub") developerId: string,
  ) {
    return this.projectsService.create(createProjectDto, developerId);
  }

  @Get()
  @ApiOperation({ summary: "Get all projects for the authenticated developer" })
  async findAll(
    @Query() query: ProjectQueryDto,
    @CurrentUser("sub") developerId: string,
  ) {
    return this.projectsService.findAll(query, developerId);
  }

  @Get(":id")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Get a project by ID" })
  @ApiParam({ name: "id", description: "Project ID" })
  async findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id);
  }

  @Get("slug/:slug")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Get a project by slug" })
  @ApiParam({ name: "slug", description: "Project slug" })
  async findBySlug(@Param("slug") slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Put(":id")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Update a project" })
  @ApiParam({ name: "id", description: "Project ID" })
  async update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(":id")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Delete a project" })
  @ApiParam({ name: "id", description: "Project ID" })
  async remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }

  @Post(":id/publish")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Publish a project" })
  @ApiParam({ name: "id", description: "Project ID" })
  async publish(@Param("id") id: string) {
    return this.projectsService.publish(id);
  }

  @Post(":id/unpublish")
  @UseGuards(ProjectAccessGuard)
  @ApiOperation({ summary: "Unpublish a project" })
  @ApiParam({ name: "id", description: "Project ID" })
  async unpublish(@Param("id") id: string) {
    return this.projectsService.unpublish(id);
  }
}
