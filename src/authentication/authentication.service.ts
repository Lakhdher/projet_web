import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { loginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { userSubscribeDto } from './dto/sign-up.dto';
import { AuthEntity } from './entities/auth.entity';
import { UserRole } from 'src/common/user-role.enum';
import { CommiteeEntity } from 'src/commitee/entities/commitee.entity';
import { EventCommiteeEntity } from 'src/event_commitee/entities/event_commitee.entity';
import { CommiteePostEntity } from 'src/commitee-posts/entities/commitee-post.entity';
import { EventCommiteePostEntity } from 'src/event_commitee_posts/entities/event_commitee_post.entity';
import { ClubEntity } from 'src/club/entities/club.entity';
import { EventEntity } from 'src/event/entities/event.entity';


@Injectable()
export class AuthenticationService {
    
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository : Repository<AuthEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        @InjectRepository(CommiteeEntity) 
        private readonly commiteeRepository : Repository<CommiteeEntity>,
        @InjectRepository(EventCommiteeEntity)
        private readonly eventCommiteeRepository : Repository<EventCommiteeEntity>,
        @InjectRepository(CommiteePostEntity)
        private readonly commiteePostRepository : Repository<CommiteePostEntity>,
        @InjectRepository(EventCommiteePostEntity)
        private readonly eventCommiteePostRepository : Repository<EventCommiteePostEntity>,
        @InjectRepository(ClubEntity)
        private readonly clubRepository : Repository<ClubEntity>,
        @InjectRepository(EventEntity)
        private readonly eventRepository : Repository<EventEntity>,
        private jwtService : JwtService
    ) {}

    async register(userDatadto : userSubscribeDto): Promise<UserEntity> {
        const {password, club, event, post, ...userData} = userDatadto;
        const {email, ...rest} = userData;
        const test = await this.authRepository.findOneBy({email});
        if(test) {
            throw new ConflictException('email, cin, or enroll_num already exists');
        }
        const auth = this.authRepository.create();
        auth.salt = await bcrypt.genSalt();
        auth.password = await bcrypt.hash(password, auth.salt);
        let user;
        if (userDatadto.role === UserRole.USER || !userDatadto.role) {
            user = this.userRepository.create(userData);
            userDatadto.role = UserRole.USER;
            try {
                await this.userRepository.save(user);   
            } catch (error) {
                throw new ConflictException('email, cin, or enroll_num already exists');
            }
        }else if (userDatadto.role === UserRole.CLUB_COMMITEE) {
            user = this.commiteeRepository.create(userData);
            const commiteePost = this.commiteePostRepository.create();
            const clubEntity = await this.clubRepository.findOneBy({clubName: club});
            commiteePost.title = post;
            commiteePost.committee = user;
            commiteePost.club = clubEntity;
            // user.posts = [commiteePost];
            try {
                await this.commiteeRepository.save(user);  
                await this.commiteePostRepository.save(commiteePost);
            } catch (error) {
                console.log(error);
            }
        }else if (userDatadto.role === UserRole.EVENT_COMMITEE) {
            user = this.eventCommiteeRepository.create(userData);
            const eventEntity = await this.eventRepository.findOneBy({title: event});
            const eventCommiteePost = this.eventCommiteePostRepository.create();
            eventCommiteePost.title = post;
            eventCommiteePost.committee = user;
            eventCommiteePost.event = eventEntity;
            // user.posts = [eventCommiteePost];
            try {
                await this.eventCommiteeRepository.save(user);   
                await this.eventCommiteePostRepository.save(eventCommiteePost);
            } catch (error) {
                throw new ConflictException('email, cin, or enroll_num already exists');
            }
        }
        auth.userId = user.id;
        auth.email = user.email;
        auth.role = userDatadto.role;
        try {
            await this.authRepository.save(auth);
        } catch (error) {
            console.log(error);
            throw new ConflictException('email, cin, or enroll_num already exists');
        }
        return user;
    }

    async login(credentials : loginCredentialsDto) {

        const {email, password} = credentials;
        const auth = await this.authRepository.findOneBy({email});   
        let user;     
        if(!auth) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const hashedPassword = await bcrypt.hash(password, auth.salt);
        if(hashedPassword !== auth.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if(auth.role === UserRole.USER) {
            user = await this.userRepository.findOneBy({id: auth.userId});
        }else if (auth.role === UserRole.CLUB_COMMITEE) {
            user = await this.commiteeRepository.findOneBy({id: auth.userId});
        }else if (auth.role === UserRole.EVENT_COMMITEE) {
            user = await this.eventCommiteeRepository.findOneBy({id: auth.userId});
        }
        const payload = { 
            email: auth.email, 
            role: auth.role , 
        };
        const token = this.jwtService.sign(payload);
        return {access_token: token};
    }

}
