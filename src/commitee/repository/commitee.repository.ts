import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommiteeEntity } from '../entities/commitee.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<CommiteeEntity> {
  constructor(@InjectRepository(CommiteeEntity) clubRepository: Repository<CommiteeEntity>) {
    super(clubRepository);
  }
}