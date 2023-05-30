import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class EventRepository extends BaseRepository<EventEntity> {
  constructor(@InjectRepository(EventEntity) clubRepository: Repository<EventEntity>) {
    super(clubRepository);
  }
}