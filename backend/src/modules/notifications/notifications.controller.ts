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
import { NotificationsService } from "./notifications.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("notifications")
@Controller("projects/:projectId/notifications")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: "Create notification" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async create(@Param("projectId") projectId: string, @Body() body: any) {
    return this.notificationsService.create(projectId, body);
  }

  @Get()
  @ApiOperation({ summary: "List notifications" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async list(@Param("projectId") projectId: string, @Query() query: any) {
    return this.notificationsService.list(projectId, query);
  }
}
