import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guards';
import { ClubEntity } from 'src/club/entities/club.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create_v2(createUserDto);
  }

  @Get('joinClub/:clubId')
  @UseGuards(JwtAuthGuard)
  async joinClub(
    @Param('clubId') clubId: number, 
    @Req() req : Request
    ) {
    return await this.userService.joinClub(req["user"], clubId);
  }

  @Get('myInfo')
  @UseGuards(JwtAuthGuard)
  async getMyInfo(
    @Req() req : Request
    ) {
    return await this.userService.getMyInfo(req["user"]);
  }

  @Get('myClubs')
  @UseGuards(JwtAuthGuard)
  async getMyClubs(
    @Req() req : Request
    ) : Promise<ClubEntity[]> {
    return await this.userService.getMyClubs(req["user"]);
  }

  
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findById(+id);
  }

  @Patch(':id')
  async update(
      @Param('id') id: string, 
      @Body() updateUserDto: CreateUserDto,
      ) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }

  


}
