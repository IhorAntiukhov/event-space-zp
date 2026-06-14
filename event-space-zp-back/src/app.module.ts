import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { EventsModule } from "./events/events.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import PrismaService from "./common/services/prisma.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaService, EventsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
