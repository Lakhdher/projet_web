import { Field, ObjectType } from "@nestjs/graphql";
import { ClubEntity } from "src/club/entities/club.entity";
import { CommiteeEntity } from "src/commitee/entities/commitee.entity";
import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@ObjectType()
@Entity("commitee_post")
export class CommiteePostEntity extends CommonEntity {
    
    @Field(() => String)
    @Column()
    title: string;

    @Field(() => CommiteeEntity)
    @ManyToOne(() => CommiteeEntity, (committee) => committee.posts)
    committee: CommiteeEntity;

    @Field(() => ClubEntity)
    @ManyToOne(() => ClubEntity, (club) => club.posts)
    club: ClubEntity
}
