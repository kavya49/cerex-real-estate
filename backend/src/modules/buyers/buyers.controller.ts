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
import { BuyersService } from "./buyers.service";
import { CreateBuyerDto, UpdateBuyerDto, BuyerQueryDto } from "./dto/buyer.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("buyers")
@Controller("projects/:projectId/buyers")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new buyer" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(
    @Param("projectId") projectId: string,
    @Body() createBuyerDto: CreateBuyerDto,
  ) {
    return this.buyersService.create(projectId, createBuyerDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all buyers for a project" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findAll(
    @Param("projectId") projectId: string,
    @Query() query: BuyerQueryDto,
  ) {
    return this.buyersService.findAll(projectId, query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a buyer by ID" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Buyer ID" })
  async findOne(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
  ) {
    return this.buyersService.findOne(projectId, id);
  }

  @Get("email/:email")
  @ApiOperation({ summary: "Get a buyer by email" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "email", description: "Buyer email" })
  async findByEmail(
    @Param("projectId") projectId: string,
    @Param("email") email: string,
  ) {
    return this.buyersService.findByEmail(projectId, email);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a buyer" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Buyer ID" })
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() updateBuyerDto: UpdateBuyerDto,
  ) {
    return this.buyersService.update(projectId, id, updateBuyerDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a buyer" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  @ApiParam({ name: "id", description: "Buyer ID" })
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.buyersService.remove(projectId, id);
  }
}
