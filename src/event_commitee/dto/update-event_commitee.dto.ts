import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCommiteeDto } from './create-event_commitee.dto';

export class UpdateEventCommiteeDto extends PartialType(CreateEventCommiteeDto) {}
