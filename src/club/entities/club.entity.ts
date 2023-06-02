import { Field, ObjectType } from "@nestjs/graphql";
import { CommiteePostEntity } from "src/commitee-posts/entities/commitee-post.entity";
import { clubs } from "src/common/clubs.enum";
import { CommonEntity } from "src/common/entities/common.entity";
import { EventEntity } from "src/event/entities/event.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@ObjectType()
@Entity('club')
export class ClubEntity extends CommonEntity {
        
        @Field(() => String)
        @Column({ 
            type: "enum",
            enum: clubs,
            unique: true
         })
        clubName: string;
        
        @Field(() => String)
        @Column({})
        email: string;

        @Field(() => String)
        @Column()
        description: string;

        @Field(() => [CommiteePostEntity], { nullable: true })
        @OneToMany(() => CommiteePostEntity, (post) => post.committee, { cascade: true })
        posts: CommiteePostEntity[];
        
        @Field(() => [EventEntity], { nullable: true })
        @ManyToMany(() => EventEntity, (event) => event.clubs, { cascade: true })
        events: EventEntity[];

        // @ManyToMany(() => UserEntity, (user) => user.clubs, { cascade: true })
        // members: UserEntity[];


}
