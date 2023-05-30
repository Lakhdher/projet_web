import { PartialType } from '@nestjs/mapped-types';
import { CreateCommiteeDto } from './create-commitee.dto';

export class UpdateCommiteeDto extends PartialType(CreateCommiteeDto) {}
