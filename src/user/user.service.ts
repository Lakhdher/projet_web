import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MembershipEntity } from 'src/membership/entity/membership.entity';
import { AuthInterface } from 'src/authentication/interface/auth.interface';
import { UserRole } from 'src/common/user-role.enum';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { ClubEntity } from 'src/club/entities/club.entity';

@Injectable()
export class UserService extends CommonService<UserEntity>{
  
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
    @InjectRepository(MembershipEntity) private membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(CommiteeEntity) private readonly commiteeRepository: Repository<CommiteeEntity>, 
    @InjectRepository(EventCommiteeEntity) private readonly eventCommiteeRepository: Repository<EventCommiteeEntity>,
    @InjectRepository(ClubEntity) private readonly clubRepository: Repository<ClubEntity>,
    ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email } });
  }
  

  async create_v2(createUserDto: CreateUserDto): Promise<UserEntity> {
    const entity = this.repository.create(createUserDto);
    try{
      await this.repository.save(entity);
    }catch(e){
      throw new ConflictException('Email, cin, or enroll_num already exists');
    }
    return entity;
  }


  async joinClub(user: AuthInterface, clubId: number) {
    // check if the club exists
    const club = await this.clubRepository.findOneBy({ id: clubId });
    if(!club){
      throw new ConflictException("Club does not exist");
    }
    const search = await this.membershipRepository.createQueryBuilder("membership")
    .andWhere("membership.email = :email", { email: user.email })
    .andWhere("membership.clubId = :clubId", { clubId: clubId })
    .getOne();
    if(search){
      throw new ConflictException("You are already a member of this club");
    }
    const membership = await this.membershipRepository.create({
      email: user.email,
      clubId: clubId,
    });
    await this.membershipRepository.save(membership);
    return {
      status: 201,
      message: "You have successfully joined the club",
    };
  }

  async getMyInfo(user: AuthInterface) : Promise<UserEntity> {
    const role = user.role;
    if(role === UserRole.CLUB_COMMITEE){
      const userInfo = await this.commiteeRepository.findOneBy({ id: user.userId });
      return userInfo;
    }else if(role === UserRole.USER){
      const userInfo = await this.findByEmail(user.email);
      return userInfo;
    }else{
      const userInfo = await this.eventCommiteeRepository.findOneBy({ id: user.userId });
      return userInfo;
    }
  }


  async getMyClubs(user: AuthInterface) : Promise<ClubEntity[]> {
  
    const memberships = await this.membershipRepository.createQueryBuilder("membership")
    .andWhere("membership.email = :email", { email: user.email })
    .getMany();
    const clubs = [];
    for(let i = 0; i < memberships.length; i++){
      const club = await this.clubRepository.findOneBy({ id: memberships[i].clubId });
      clubs.push(club);
    }
    return clubs;
  }

}
