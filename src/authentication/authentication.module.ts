import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from "dotenv";
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { EventCommiteePostEntity } from 'src/event_commitee_posts/entities/event_commitee_post.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { ClubEntity } from 'src/club/entities/club.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config()
@Module({
  controllers: [AuthenticationController],
  imports: [TypeOrmModule.forFeature([AuthEntity, UserEntity, CommiteeEntity, EventCommiteeEntity, CommiteePostEntity, EventCommiteePostEntity, EventEntity, ClubEntity]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({ secret: process.env.JWT_SECRET , signOptions: { expiresIn: '1h' }})],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
