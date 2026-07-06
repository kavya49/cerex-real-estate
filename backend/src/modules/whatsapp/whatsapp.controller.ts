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
import { WhatsappService } from "./whatsapp.service";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { ProjectAccessGuard } from "../../guards/project-access.guard";

@ApiTags("whatsapp")
@Controller("projects/:projectId/whatsapp")
@UseGuards(JwtAuthGuard, ProjectAccessGuard)
@ApiBearerAuth()
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post("send")
  @ApiOperation({ summary: "Send WhatsApp message" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async send(
    @Param("projectId") projectId: string,
    @Body() body: { to: string; template: string; params?: any[] },
  ) {
    return this.whatsappService.sendMessage(
      projectId,
      body.to,
      body.template,
      body.params,
    );
  }

  @Get("templates")
  @ApiOperation({ summary: "List templates" })
  @ApiParam({ name: "projectId", description: "Project ID" })
  async templates(@Param("projectId") projectId: string, @Query() query: any) {
    return this.whatsappService.listTemplates(projectId, query);
  }
}
