import { Field, Int } from "@nestjs/graphql";
import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('membership')
export class MembershipEntity extends CommonEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    email : string

    @Field(() => String)
    @Column()
    clubId : number

}