import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { EventEntity } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { ClubService } from 'src/club/club.service';
import { UserRole } from 'src/common/user-role.enum';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { EventCommiteePostEntity } from 'src/event_commitee_posts/entities/event_commitee_post.entity';
import { AuthInterface } from 'src/authentication/interface/auth.interface';

@Injectable()
export class EventService extends CommonService<EventEntity> {

  constructor(
    private readonly clubService: ClubService,
    @InjectRepository(EventEntity) repository : Repository<EventEntity>,
    @InjectRepository(CommiteeEntity)  private readonly commiteeRepository: Repository<CommiteeEntity>,
    @InjectRepository(EventCommiteeEntity)  private readonly eventCommiteeRepository: Repository<EventCommiteeEntity>,
    @InjectRepository(CommiteePostEntity) private readonly commiteePostRepository: Repository<CommiteePostEntity>,
    @InjectRepository(EventCommiteePostEntity) private readonly eventCommiteePostRepository: Repository<EventCommiteePostEntity>, 
    ) {
    super(repository);
  }

  async create_v2(CreateEventDto: CreateEventDto, user: AuthInterface): Promise<EventEntity> {
    if(user.role !== UserRole.CLUB_COMMITEE) {
      throw new UnauthorizedException("You are not authorized to create an event");
    }
    let myClubs = [];
    if(user.role === UserRole.CLUB_COMMITEE) {
      myClubs = await this.clubService.getMyClubs(user.userId);
      for(const pclub of CreateEventDto.clubs)
      {
        let found = false;
        for(const club of myClubs)
        {
          if(pclub === club.clubName)
          {
            found = true;
            break;
          }
        }
        if(!found)
        {
          throw new UnauthorizedException("You are not authorized to create an event for " + pclub);
        }
      }
    } 
    const event = new EventEntity();
    event.title = CreateEventDto.title;
    event.description = CreateEventDto.description;
    event.clubs = [];
    for (const clubName of CreateEventDto.clubs) {
      const club = await this.clubService.findByName(clubName);
      if(club) {
        event.clubs.push(club);
      }
    }
    return await this.repository.save(event);
  }


  async getMyEvents(userId: number): Promise<EventEntity[]> {
    const posts = await this.eventCommiteePostRepository.createQueryBuilder("event_commitee_post")
    .andWhere("event_commitee_post.committeeId = :id", { id: userId })
    .leftJoinAndSelect("event_commitee_post.event", "event")
    .getMany();
    const events = [];
    for (const post of posts) {
      events.push(post.event);
    }
    return events;
  }

  async getAll() : Promise<EventEntity[]> {
    return await this.repository.find({relations: ["clubs"]});
  }

}
