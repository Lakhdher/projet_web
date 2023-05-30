import { PartialType } from '@nestjs/mapped-types';
import { CreateCommiteePostDto } from './create-commitee-post.dto';

export class UpdateCommiteePostDto extends PartialType(CreateCommiteePostDto) {}
