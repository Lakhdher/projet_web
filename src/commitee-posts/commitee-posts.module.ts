import { Module } from '@nestjs/common';
import { CommiteePostsService } from './commitee-posts.service';
import { CommiteePostsController } from './commitee-posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommiteePostEntity } from './entities/commitee-post.entity';

@Module({
  controllers: [CommiteePostsController],
  providers: [CommiteePostsService],
  imports: [TypeOrmModule.forFeature([CommiteePostEntity])],
})
export class CommiteePostsModule {}
