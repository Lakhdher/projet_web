import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Sections } from 'src/common/section.enum';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity("user")
export class UserEntity extends CommonEntity{

    @Field(() => String)
    @Column({ length: 50 })
    firstname: string;

    @Field(() => String)
    @Column({ length: 50 })
    lastname: string;

    @Field(() => String)
    @Column({ 
        length: 7 ,
        unique: true
    })
    enroll_num: string;

    @Field(() => String)
    @Column({ 
        length: 8 ,
        unique: true
    })
    cin: string;

    @Field(() => String)
    @Column({
        unique: true
    })
    email: string;

    @Field(() => String)
    @Column()
    phone: string;

    @Field(() => String)
    @Column({
        type: "enum",
        enum: Sections
    })
    section: string;

    @Field(() => Int)
    @Column()
    level: number;

    // @ManyToMany(() => ClubEntity, club => club.members)
    // clubs: ClubEntity[];

}