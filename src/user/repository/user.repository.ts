import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) userRepository: Repository<UserEntity>) {
    super(userRepository);
  }
}