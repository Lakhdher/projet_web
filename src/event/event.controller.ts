import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guards';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
      @Body() CreateEventDto: CreateEventDto,
      @Req() req: Request
    ) {
    return await this.eventService.create_v2(CreateEventDto, req['user']);
  }

  @Get()
  async findAll( 
  ) {
    return await this.eventService.getAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findById(+id);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() updateEventDto: UpdateEventDto,
      ) {
    return await this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventService.delete(+id);
  }

}

