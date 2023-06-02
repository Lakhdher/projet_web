import { Field, ObjectType } from "@nestjs/graphql";
import { EventCommiteePostEntity } from "src/event_commitee_posts/entities/event_commitee_post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, OneToMany } from "typeorm";


@ObjectType()
@Entity('event_commitee')
export class EventCommiteeEntity extends UserEntity {

    @Field(() => [EventCommiteePostEntity], { nullable: true })
    @OneToMany(() => EventCommiteePostEntity, (post) => post.committee)
    posts: EventCommiteePostEntity[];

}
