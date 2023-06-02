import { Field, ObjectType } from "@nestjs/graphql";
import { CommonEntity } from "src/common/entities/common.entity";
import { EventEntity } from "src/event/entities/event.entity";
import { EventCommiteeEntity } from "src/event_commitee/entities/event_commitee.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@ObjectType()
@Entity('event_commitee_post')
export class EventCommiteePostEntity extends CommonEntity {
    
    @Field(() => String)
    @Column()
    title: string;

    @Field(() => EventCommiteeEntity)
    @ManyToOne(() => EventCommiteeEntity, (committee) => committee.posts)
    committee: EventCommiteeEntity;

    @Field(() => EventEntity)
    @ManyToOne(() => EventEntity, (event) => event.posts)
    event: EventEntity

}
