import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './entities/club.entity';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { MembershipEntity } from 'src/membership/entity/membership.entity';
import { AuthEntity } from 'src/authentication/entities/auth.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { UserModule } from 'src/user/user.module';
import { ClubResolver } from './club.resolver';

@Module({
  controllers: [ClubController],
  providers: [ClubService, ClubResolver],
  imports: [UserModule, TypeOrmModule.forFeature([ClubEntity, CommiteePostEntity, AuthEntity,EventCommiteeEntity, CommiteeEntity, MembershipEntity])],
  exports: [ClubService],
})
export class ClubModule {}
