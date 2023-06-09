import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { MembershipEntity } from 'src/membership/entity/membership.entity';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { ClubEntity } from 'src/club/entities/club.entity';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserResolver],
  imports: [TypeOrmModule.forFeature([UserEntity,ClubEntity, MembershipEntity, CommiteeEntity, EventCommiteeEntity])],
  exports: [UserService, UserRepository],
})
export class UserModule {}
