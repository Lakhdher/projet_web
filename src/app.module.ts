import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { AuthEntity } from './authentication/entities/auth.entity';
import { ClubModule } from './club/club.module';
import { CommiteeModule } from './commitee/commitee.module';
import { CommiteeEntity } from './commitee/entities/commitee.entity';
import { ClubEntity } from './club/entities/club.entity';
import { CommiteePostsModule } from './commitee-posts/commitee-posts.module';
import { CommiteePostEntity } from './commitee-posts/entities/commitee-post.entity';
import { EventCommiteeModule } from './event_commitee/event_commitee.module';
import { EventModule } from './event/event.module';
import { EventCommiteePostsModule } from './event_commitee_posts/event_commitee_posts.module';
import { EventEntity } from './event/entities/event.entity';
import { EventCommiteePostEntity } from './event_commitee_posts/entities/event_commitee_post.entity';
import { EventCommiteeEntity } from './event_commitee/entities/event_commitee.entity';
import { MembershipModule } from './membership/membership.module';
import { MembershipEntity } from './membership/entity/membership.entity';


dotenv.config();
@Module({
  imports: [CommonModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserEntity, AuthEntity,MembershipEntity, CommiteeEntity, ClubEntity, CommiteePostEntity, EventEntity, EventCommiteePostEntity, EventCommiteeEntity ],
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthenticationModule,
  ClubModule,
  CommiteeModule,
  CommiteePostsModule,
  EventCommiteeModule,
  EventModule,
  EventCommiteePostsModule,
  MembershipModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}