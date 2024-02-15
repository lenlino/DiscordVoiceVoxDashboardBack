import { BotService } from './services/bot.service';
import { PrismaService } from './services/prisma.service';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GuildController } from './controllers/guild.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [AppController, GuildController, UserController],
  providers: [PrismaService, BotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('guilds');
  }
}
