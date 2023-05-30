import { Module } from '@nestjs/common';
import { EventCommiteeService } from './event_commitee.service';
import { EventCommiteeController } from './event_commitee.controller';

@Module({
  controllers: [EventCommiteeController],
  providers: [EventCommiteeService]
})
export class EventCommiteeModule {}
