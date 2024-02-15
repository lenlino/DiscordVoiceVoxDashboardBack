import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { voice } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';
import { BotService } from '../services/bot.service';

@Controller('/users/:user')
export class UserController {
  constructor(
    private readonly bot: BotService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/settings')
  async getFeature(@Param('user') user: string) {
    const data = await this.prisma.voice.findUnique({
      where: {
        id: user,
      },
    });
    if (data == null) return null;

    return {
      voiceid: data.voiceid,
      speed: data.speed,
      pitch: data.pitch,
    };
  }

  @Patch('/settings')
  async updateFeature(
    @Req() req: AuthRequest,
    @Param('user') user: string,
    @Body() body: Partial<voice>,
  ) {
    /*await this.bot.checkPermissions(req.session, user);*/

    const updated = await this.prisma.voice.update({
      where: {
        id: user,
      },
      data: {
        ...body,
        id: undefined,
      },
    });

    return updated;
  }
}
