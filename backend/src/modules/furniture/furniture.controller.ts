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
import { FurnitureService } from "./furniture.service";
import {
  CreateFurnitureDto,
  UpdateFurnitureDto,
  FurnitureQueryDto,
} from "./dto/furniture.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("furniture")
@Controller("projects/:projectId/furniture")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  @ApiOperation({ summary: "Create furniture item" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(
    @Param("projectId") projectId: string,
    @Body() dto: CreateFurnitureDto,
  ) {
    return this.furnitureService.create(projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: "List furniture" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findAll(
    @Param("projectId") projectId: string,
    @Query() query: FurnitureQueryDto,
  ) {
    return this.furnitureService.findAll(projectId, query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get furniture by ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Furniture ID" })
  async findOne(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
  ) {
    return this.furnitureService.findOne(projectId, id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update furniture" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Furniture ID" })
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() dto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(projectId, id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete furniture" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Furniture ID" })
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.furnitureService.remove(projectId, id);
  }
}
