import { Exclude } from "class-transformer";
import { ClubEntity } from "src/club/entities/club.entity";
import { CommiteeEntity } from "src/commitee/entities/commitee.entity";
import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity("commitee_post")
export class CommiteePostEntity extends CommonEntity {
    
    @Column()
    title: string;

    @ManyToOne(() => CommiteeEntity, (committee) => committee.posts)
    committee: CommiteeEntity;

    @ManyToOne(() => ClubEntity, (club) => club.posts)
    club: ClubEntity
}
