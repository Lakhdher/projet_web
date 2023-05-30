import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guards';
import { ClubEntity } from './entities/club.entity';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Body() createClubDto: CreateClubDto) {
    return await this.clubService.create(createClubDto);
  }

  @Get('myclubs')
  @UseGuards(JwtAuthGuard)
  async getMyClubs(@Req() req : Request) : Promise<ClubEntity[]> {
    return await this.clubService.getMyClubs(req['user'].userId);
  }

  @Get(':id/members')
  @UseGuards(JwtAuthGuard)
  async getAllMembers(@Param('id') id: string, @Req() req : Request) {
    return await this.clubService.getAllMembers(+id, req['user']);
  }

  @Get()
  async findAll() : Promise<ClubEntity[]> {
    return this.clubService.findAllWithEvents();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clubService.findById(+id);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() updateClubDto: UpdateClubDto,
      ) {
    return await this.clubService.update(+id, updateClubDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clubService.delete(+id);
  }

  @Delete(':id/members/:email')
  @UseGuards(JwtAuthGuard)
  async removeMember(@Param('id') id: string, @Param('email') email: string, @Req() req : Request) {
    return await this.clubService.removeMember(+id, email, req['user']);
  }

}
