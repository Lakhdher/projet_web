import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventCommiteePostsService } from './event_commitee_posts.service';
import { CreateEventCommiteePostDto } from './dto/create-event_commitee_post.dto';
import { UpdateEventCommiteePostDto } from './dto/update-event_commitee_post.dto';

@Controller('event-commitee-posts')
export class EventCommiteePostsController {
  constructor(private readonly eventCommiteePostsService: EventCommiteePostsService) {}

  @Post()
  create(@Body() createEventCommiteePostDto: CreateEventCommiteePostDto) {
    return this.eventCommiteePostsService.create(createEventCommiteePostDto);
  }

  @Get()
  findAll() {
    return this.eventCommiteePostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventCommiteePostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventCommiteePostDto: UpdateEventCommiteePostDto) {
    return this.eventCommiteePostsService.update(+id, updateEventCommiteePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventCommiteePostsService.remove(+id);
  }
}
