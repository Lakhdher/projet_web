import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateCommiteePostDto } from './dto/create-commitee-post.dto';
import { UpdateCommiteePostDto } from './dto/update-commitee-post.dto';
import { CommiteePostsService } from './commitee-posts.service';

@Controller('commitee-posts')
export class CommiteePostsController {
  constructor(private readonly commiteePostsService: CommiteePostsService) {}

  @Post()
  async create(@Body() createCommiteePostDto: CreateCommiteePostDto) {
    return await this.commiteePostsService.create(createCommiteePostDto);
  }

  @Get()
  findAll() {
    return this.commiteePostsService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commiteePostsService.findById(+id);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() UpdateCommiteePostDto: UpdateCommiteePostDto,
      ) {
    return await this.commiteePostsService.update(+id, UpdateCommiteePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commiteePostsService.delete(+id);
  }


}
