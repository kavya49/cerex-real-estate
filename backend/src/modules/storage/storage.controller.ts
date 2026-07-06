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
import { StorageService } from "./storage.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("storage")
@Controller("projects/:projectId/storage")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post("upload")
  @ApiOperation({ summary: "Get signed upload URL" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async uploadUrl(
    @Param("projectId") projectId: string,
    @Body() body: { filename: string; contentType: string },
  ) {
    return this.storageService.getUploadUrl(
      projectId,
      body.filename,
      body.contentType,
    );
  }

  @Get()
  @ApiOperation({ summary: "List stored objects" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async list(@Param("projectId") projectId: string, @Query() query: any) {
    return this.storageService.list(projectId, query);
  }
}
