import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCommiteePostDto } from './create-event_commitee_post.dto';

export class UpdateEventCommiteePostDto extends PartialType(CreateEventCommiteePostDto) {}
