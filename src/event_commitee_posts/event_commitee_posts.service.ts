import { Injectable } from '@nestjs/common';
import { CreateEventCommiteePostDto } from './dto/create-event_commitee_post.dto';
import { UpdateEventCommiteePostDto } from './dto/update-event_commitee_post.dto';

@Injectable()
export class EventCommiteePostsService {
  create(createEventCommiteePostDto: CreateEventCommiteePostDto) {
    return 'This action adds a new eventCommiteePost';
  }

  findAll() {
    return `This action returns all eventCommiteePosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventCommiteePost`;
  }

  update(id: number, updateEventCommiteePostDto: UpdateEventCommiteePostDto) {
    return `This action updates a #${id} eventCommiteePost`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCommiteePost`;
  }
}
