import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommiteePostEntity } from './entities/commitee-post.entity';

@Injectable()
export class CommiteePostsService extends CommonService<CommiteePostEntity>{

  constructor(@InjectRepository(CommiteePostEntity) commiteePostsRepository : Repository<CommiteePostEntity>) {
    super(commiteePostsRepository);
  }

}
