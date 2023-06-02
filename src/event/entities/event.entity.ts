import { Field, ObjectType } from "@nestjs/graphql";
import { ClubEntity } from "src/club/entities/club.entity";
import { CommonEntity } from "src/common/entities/common.entity";
import { EventCommiteePostEntity } from "src/event_commitee_posts/entities/event_commitee_post.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";


@ObjectType()
@Entity('event')
export class EventEntity extends CommonEntity {

    @Field(() => String)
    @Column({
        unique: true
    }
    )
    title: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => [ClubEntity], { nullable: true })
    @ManyToMany(() => ClubEntity, club => club.events)
    @JoinTable()
    clubs: ClubEntity[];

    @Field(() => [EventCommiteePostEntity], { nullable: true })
    @OneToMany(() => EventCommiteePostEntity, ecp => ecp.event, { cascade: true })
    posts: EventCommiteePostEntity[];

}
