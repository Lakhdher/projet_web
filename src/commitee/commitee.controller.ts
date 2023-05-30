import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CommiteeService } from './commitee.service';
import { CreateCommiteeDto } from './dto/create-commitee.dto';

@Controller('commitee')
export class CommiteeController {
  constructor(private readonly commiteeService: CommiteeService) {}

  @Post()
  async create(@Body() createCommiteeDto: CreateCommiteeDto) {
    return await this.commiteeService.create_v2(createCommiteeDto);
  }

  @Get()
  findAll() {
    return this.commiteeService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commiteeService.findById(+id);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() updateCommiteeDto: CreateCommiteeDto,
      ) {
    return await this.commiteeService.update(+id, updateCommiteeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commiteeService.delete(+id);
  }


}
