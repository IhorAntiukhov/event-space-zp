import { Controller, Get, Param, Query } from "@nestjs/common";
import { EventsService } from "./events.service";
import { GetAllEventsQueryDto } from "./dto/getAllEventsQuery.dto";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() { category }: GetAllEventsQueryDto) {
    return this.eventsService.findAll(category);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.eventsService.findById(+id);
  }
}
