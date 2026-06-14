import { Injectable } from "@nestjs/common";
import { Category } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(category?: Category) {
    return await this.prismaService.event.findMany({
      where: category
        ? {
            category,
          }
        : undefined,
    });
  }

  async findById(id: number) {
    return await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }
}
