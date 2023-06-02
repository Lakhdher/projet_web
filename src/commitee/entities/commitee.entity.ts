import { Field, ObjectType } from "@nestjs/graphql";
import { CommiteePostEntity } from "src/commitee-posts/entities/commitee-post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Entity, OneToMany } from "typeorm";

@ObjectType()
@Entity('commitee')
export class CommiteeEntity extends UserEntity {
    
    @Field(() => [CommiteePostEntity], { nullable: true })
    @OneToMany(() => CommiteePostEntity, (post) => post.committee)
    posts: CommiteePostEntity[];

}
