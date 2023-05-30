import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventCommiteeService } from './event_commitee.service';
import { CreateEventCommiteeDto } from './dto/create-event_commitee.dto';
import { UpdateEventCommiteeDto } from './dto/update-event_commitee.dto';

@Controller('event-commitee')
export class EventCommiteeController {
  constructor(private readonly eventCommiteeService: EventCommiteeService) {}

  @Post()
  create(@Body() createEventCommiteeDto: CreateEventCommiteeDto) {
    return this.eventCommiteeService.create(createEventCommiteeDto);
  }

  @Get()
  findAll() {
    return this.eventCommiteeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventCommiteeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventCommiteeDto: UpdateEventCommiteeDto) {
    return this.eventCommiteeService.update(+id, updateEventCommiteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventCommiteeService.remove(+id);
  }
}
