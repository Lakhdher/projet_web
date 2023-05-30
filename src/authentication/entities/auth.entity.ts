import { CommonEntity } from "src/common/entities/common.entity";
import { UserRole } from "src/common/user-role.enum";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity("auth")
export class AuthEntity extends CommonEntity {
    
    @Column({
        unique: true,
    })
    email : string;

    @Column()
    password : string;

    @Column()
    salt : string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role : string;

    @Column({
    })
    userId: number;

}