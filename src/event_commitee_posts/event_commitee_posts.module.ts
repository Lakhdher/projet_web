import { Module } from '@nestjs/common';
import { EventCommiteePostsService } from './event_commitee_posts.service';
import { EventCommiteePostsController } from './event_commitee_posts.controller';

@Module({
  controllers: [EventCommiteePostsController],
  providers: [EventCommiteePostsService]
})
export class EventCommiteePostsModule {}
