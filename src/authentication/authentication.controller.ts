import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { userSubscribeDto } from './dto/sign-up.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userData : userSubscribeDto): Promise<Partial<UserEntity>> {
      return this.authenticationService.register(userData);
  }

  @Post('login')
  async login(@Body() credentials : loginCredentialsDto) {
      return this.authenticationService.login(credentials);
  }
  
}
