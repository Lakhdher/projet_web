import { Exclude } from "class-transformer";
import { CommiteePostEntity } from "src/commitee-posts/entities/commitee-post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, OneToMany } from "typeorm";

@Entity('commitee')
export class CommiteeEntity extends UserEntity {
    
    @OneToMany(() => CommiteePostEntity, (post) => post.committee)
    posts: CommiteePostEntity[];

}
