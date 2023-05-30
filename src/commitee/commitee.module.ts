import { Module } from '@nestjs/common';
import { CommiteeService } from './commitee.service';
import { CommiteeController } from './commitee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommiteeEntity } from './entities/commitee.entity';

@Module({
  controllers: [CommiteeController],
  providers: [CommiteeService],
  imports: [TypeOrmModule.forFeature([CommiteeEntity])],
})
export class CommiteeModule {}
