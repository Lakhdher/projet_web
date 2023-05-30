import { ClubEntity } from 'src/club/entities/club.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Sections } from 'src/common/section.enum';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity("user")
export class UserEntity extends CommonEntity{

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ 
        length: 7 ,
        unique: true
    })
    enroll_num: string;

    @Column({ 
        length: 8 ,
        unique: true
    })
    cin: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    phone: string;

    @Column({
        type: "enum",
        enum: Sections
    })
    section: string;

    @Column()
    level: number;

    // @ManyToMany(() => ClubEntity, club => club.members)
    // clubs: ClubEntity[];

}