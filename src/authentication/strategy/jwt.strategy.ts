import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from "dotenv";
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { payloadInterface } from '../interface/payload.interface';



dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: payloadInterface) {
    const auth = await this.authRepository.findOneBy({email: payload.email});
    if(auth){
        const {password, salt, ...rest} = auth;
        return rest;
    }else {
        throw new UnauthorizedException();
    }

  }
}