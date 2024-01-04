import { AbstractEntity } from "src/common/entities";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity()
export class Admin extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}