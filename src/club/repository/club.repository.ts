import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from '../entities/club.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<ClubEntity> {
  constructor(@InjectRepository(ClubEntity) clubRepository: Repository<ClubEntity>) {
    super(clubRepository);
  }
}