import { Injectable } from '@nestjs/common';
import { CreateEventCommiteeDto } from './dto/create-event_commitee.dto';
import { UpdateEventCommiteeDto } from './dto/update-event_commitee.dto';

@Injectable()
export class EventCommiteeService {
  create(createEventCommiteeDto: CreateEventCommiteeDto) {
    return 'This action adds a new eventCommitee';
  }

  findAll() {
    return `This action returns all eventCommitee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventCommitee`;
  }

  update(id: number, updateEventCommiteeDto: UpdateEventCommiteeDto) {
    return `This action updates a #${id} eventCommitee`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCommitee`;
  }
}
