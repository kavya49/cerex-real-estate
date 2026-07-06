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
import { LeadsService } from "./leads.service";
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto } from "./dto/lead.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("leads")
@Controller("projects/:projectId/leads")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: "Create a lead" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(
    @Param("projectId") projectId: string,
    @Body() dto: CreateLeadDto,
  ) {
    return this.leadsService.create(projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: "List leads" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findAll(
    @Param("projectId") projectId: string,
    @Query() query: LeadQueryDto,
  ) {
    return this.leadsService.findAll(projectId, query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get lead by ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Lead ID" })
  async findOne(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
  ) {
    return this.leadsService.findOne(projectId, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update lead" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Lead ID" })
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.leadsService.update(projectId, id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete lead" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Lead ID" })
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.leadsService.remove(projectId, id);
  }
}
