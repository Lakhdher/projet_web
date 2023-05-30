import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entity/membership.entity';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService],
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
})
export class MembershipModule {}
