import {
  Controller,
  Get,
  Post,
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
import { EventsService } from "./events.service";
import { CreateEventDto, EventQueryDto } from "./dto/event.dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("events")
@Controller("projects/:projectId/events")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: "Track an event" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(
    @Param("projectId") projectId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create(projectId, createEventDto);
  }

  @Get()
  @ApiOperation({ summary: "Get events for a project" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async findAll(
    @Param("projectId") projectId: string,
    @Query() query: EventQueryDto,
  ) {
    return this.eventsService.findAll(projectId, query);
  }
}
