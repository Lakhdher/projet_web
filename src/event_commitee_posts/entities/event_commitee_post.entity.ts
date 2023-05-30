import { CommonEntity } from "src/common/entities/common.entity";
import { EventEntity } from "src/event/entities/event.entity";
import { EventCommiteeEntity } from "src/event_commitee/entities/event_commitee.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('event_commitee_post')
export class EventCommiteePostEntity extends CommonEntity {
    
    @Column()
    title: string;

    @ManyToOne(() => EventCommiteeEntity, (committee) => committee.posts)
    committee: EventCommiteeEntity;

    @ManyToOne(() => EventEntity, (event) => event.posts)
    event: EventEntity

}
