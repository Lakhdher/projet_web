import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommiteePostEntity } from '../entities/commitee-post.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<CommiteePostEntity> {
  constructor(@InjectRepository(CommiteePostEntity) clubRepository: Repository<CommiteePostEntity>) {
    super(clubRepository);
  }
}