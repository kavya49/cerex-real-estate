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
import { DevelopersService } from "./developers.service";
import {
  CreateDeveloperDto,
  UpdateDeveloperDto,
  DeveloperQueryDto,
} from "./dto/developer.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { Roles } from "../../decorators/roles.decorator";

@ApiTags("developers")
@Controller("developers")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin", "super-admin")
@ApiBearerAuth()
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new developer" })
  async create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all developers" })
  async findAll(@Query() query: DeveloperQueryDto) {
    return this.developersService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a developer by ID" })
  @ApiParam({ name: "id", description: "Developer ID" })
  async findOne(@Param("id") id: string) {
    return this.developersService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a developer" })
  @ApiParam({ name: "id", description: "Developer ID" })
  async update(
    @Param("id") id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(id, updateDeveloperDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a developer" })
  @ApiParam({ name: "id", description: "Developer ID" })
  async remove(@Param("id") id: string) {
    return this.developersService.remove(id);
  }

  @Put(":id/status")
  @ApiOperation({ summary: "Update developer status" })
  @ApiParam({ name: "id", description: "Developer ID" })
  async updateStatus(
    @Param("id") id: string,
    @Body("isActive") isActive: boolean,
  ) {
    return this.developersService.updateStatus(id, isActive);
  }
}
