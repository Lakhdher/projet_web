import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('membership')
export class MembershipEntity extends CommonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email : string

    @Column()
    clubId : number

}