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
import { KnowledgeService } from "./knowledge.service";
import {
  CreateKnowledgeDto,
  UpdateKnowledgeDto,
  KnowledgeQueryDto,
} from "./dto/knowledge.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("knowledge")
@Controller("projects/:projectId/knowledge")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  @ApiOperation({ summary: "Create knowledge base article" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(
    @Param("projectId") projectId: string,
    @Body() dto: CreateKnowledgeDto,
  ) {
    return this.knowledgeService.create(projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: "List knowledge base articles" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findAll(
    @Param("projectId") projectId: string,
    @Query() query: KnowledgeQueryDto,
  ) {
    return this.knowledgeService.findAll(projectId, query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get article by ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Article ID" })
  async findOne(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
  ) {
    return this.knowledgeService.findOne(projectId, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update article" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Article ID" })
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() dto: UpdateKnowledgeDto,
  ) {
    return this.knowledgeService.update(projectId, id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete article" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Article ID" })
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.knowledgeService.remove(projectId, id);
  }
}
