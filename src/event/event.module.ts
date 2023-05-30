import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { ClubService } from 'src/club/club.service';
import { ClubModule } from 'src/club/club.module';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { EventCommiteePostEntity } from 'src/event_commitee_posts/entities/event_commitee_post.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [TypeOrmModule.forFeature([EventEntity, CommiteeEntity, CommiteePostEntity, EventCommiteeEntity, EventCommiteePostEntity]), ClubModule],
})
export class EventModule {}
