import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { CommonService } from 'src/common/common.service';
import { ClubEntity } from './entities/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { AuthInterface } from 'src/authentication/interface/auth.interface';
import { UserRole } from 'src/common/user-role.enum';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { MembershipEntity } from 'src/membership/entity/membership.entity';
import { AuthEntity } from 'src/authentication/entities/auth.entity';
import { UserRepository } from './repository/club.repository';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClubService extends CommonService<ClubEntity> {
  constructor(
    @InjectRepository(ClubEntity) repository: Repository<ClubEntity>,
    @InjectRepository(CommiteePostEntity) private readonly commiteePostRepository: Repository<CommiteePostEntity>,
    @InjectRepository(CommiteeEntity) private readonly commiteeRepository: Repository<CommiteeEntity>,
    @InjectRepository(MembershipEntity) private readonly membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(AuthEntity) private readonly authenticationRepository: Repository<AuthEntity>,
    @InjectRepository(EventCommiteeEntity) private readonly eventCommiteeRepository: Repository<EventCommiteeEntity>,
    @Inject(UserService) private readonly userService: UserService,
    ) {
    super(repository);
  }

  async findByName(names: string): Promise<ClubEntity> {
    return await this.repository.findOneBy({ clubName: names });
  }

  async getMyClubs(userId: number): Promise<ClubEntity[]> {
    const posts = await this.commiteePostRepository.createQueryBuilder("commitee_post")
    .andWhere("commitee_post.committeeId = :id", { id: userId })
    .leftJoinAndSelect("commitee_post.club", "club")
    .getMany();
    const clubs = [];
    for (const post of posts) {
      clubs.push(post.club);
    }
    return clubs;
  }


  async findAllWithEvents(): Promise<ClubEntity[]> {
    return await this.repository.find({ relations: ["events"] });
  }

  async checkIfCommitee(clubId: number, user: AuthInterface): Promise<boolean> {
    const authenticatedUser = await this.commiteeRepository.findOneBy({ id: user.userId });
    const posts = await this.commiteePostRepository.createQueryBuilder("commitee_post")
    .andWhere("commitee_post.committeeId = :id", { id:  authenticatedUser.id })
    .leftJoinAndSelect("commitee_post.club", "club")
    .getMany();
    const clubs = [];
    for (const post of posts) {
      clubs.push(post.club);
    }
    const club = clubs.find(club => club.id === clubId);
    if(!club){
      return false;
    }
    return true;
  }


  async getAllMembers(clubId: number, user: AuthInterface) : Promise<any> {
    if(user.role !== UserRole.CLUB_COMMITEE){
      throw new UnauthorizedException("You are not authorized to perform this action");
    }
    if(!await this.checkIfCommitee(clubId, user)){
      throw new UnauthorizedException("You are not commitee of this club");
    }
    const memberships = await this.membershipRepository.createQueryBuilder("membership")
    .andWhere("membership.clubId = :id", { id: clubId })
    .getMany();
    const members = [];
    for (const membership of memberships) {
      const auth = await this.authenticationRepository.findOneBy({ email: membership.email });
      const role = auth.role;
      if(role === UserRole.CLUB_COMMITEE){
        members.push(await this.commiteeRepository.findOneBy({ id: auth.userId }));
      } else if (role === UserRole.USER){
        members.push(await this.userService.findByEmail(auth.email));
      } else if (role === UserRole.EVENT_COMMITEE){
        members.push(await this.eventCommiteeRepository.findOneBy({ id: auth.userId }));
      }
    }
    return members;
  }

  async removeMember(clubId: number, email: string, user: AuthInterface)  {
    if(user.role !== UserRole.CLUB_COMMITEE){
      throw new UnauthorizedException("You are not authorized to perform this action");
    }
    if(!await this.checkIfCommitee(clubId, user)){
      throw new UnauthorizedException("You are not authorized to perform this action");
    }
    const membership = await this.membershipRepository.createQueryBuilder("membership")
    .andWhere("membership.clubId = :id", { id: clubId })
    .andWhere("membership.email = :email", { email: email })
    .getOne();
    if(!membership){
      throw new UnauthorizedException("the user is not a member of this club");
    }
    return await this.membershipRepository.delete(membership.id);
  }

}
