import { CommonEntity } from "src/common/entities/common.entity";
import { EventCommiteePostEntity } from "src/event_commitee_posts/entities/event_commitee_post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity('event_commitee')
export class EventCommiteeEntity extends UserEntity {

    @OneToMany(() => EventCommiteePostEntity, (post) => post.committee)
    posts: EventCommiteePostEntity[];

}
