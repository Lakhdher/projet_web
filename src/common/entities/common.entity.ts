//create a generic common entity that will be used by all other entities in the application 
// Path: src\common\entities\common.entity.ts
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, DeleteDateColumn, BaseEntity } from "typeorm";

@Entity("common")
export abstract class CommonEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({update: false})
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
}