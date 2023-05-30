import { Body, ConflictException, Injectable, Post } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { CommiteeEntity } from './entities/commitee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommiteeDto } from './dto/create-commitee.dto';

@Injectable()
export class CommiteeService extends CommonService<CommiteeEntity>{
  
  constructor(@InjectRepository(CommiteeEntity) repository: Repository<CommiteeEntity>) {
    super(repository);
  }

  async create_v2(CreateCommiteeDto: CreateCommiteeDto): Promise<CommiteeEntity> {
    const entity = this.repository.create(CreateCommiteeDto);
    entity.posts = [];
    try{
      await this.repository.save(entity);
    }catch(e){
      throw new ConflictException('Email, cin, or enroll_num already exists');
    }
    return entity;
  }

}
