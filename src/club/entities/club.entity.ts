import { CommiteePostEntity } from "src/commitee-posts/entities/commitee-post.entity";
import { clubs } from "src/common/clubs.enum";
import { CommonEntity } from "src/common/entities/common.entity";
import { EventEntity } from "src/event/entities/event.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity('club')
export class ClubEntity extends CommonEntity {
        
        @Column({ 
            type: "enum",
            enum: clubs,
            unique: true
         })
        clubName: string;
    
        @Column({})
        email: string;

        @Column()
        description: string;

        @OneToMany(() => CommiteePostEntity, (post) => post.committee, { cascade: true })
        posts: CommiteePostEntity[];

        @ManyToMany(() => EventEntity, (event) => event.clubs, { cascade: true })
        events: EventEntity[];

        // @ManyToMany(() => UserEntity, (user) => user.clubs, { cascade: true })
        // members: UserEntity[];


}
