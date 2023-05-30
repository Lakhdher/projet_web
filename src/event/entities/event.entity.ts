import { ClubEntity } from "src/club/entities/club.entity";
import { CommonEntity } from "src/common/entities/common.entity";
import { EventCommiteePostEntity } from "src/event_commitee_posts/entities/event_commitee_post.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";


@Entity('event')
export class EventEntity extends CommonEntity {

    @Column({
        unique: true
    }
    )
    title: string;

    @Column()
    description: string;

    @ManyToMany(() => ClubEntity, club => club.events)
    @JoinTable()
    clubs: ClubEntity[];

    @OneToMany(() => EventCommiteePostEntity, ecp => ecp.event, { cascade: true })
    posts: EventCommiteePostEntity[];

}
