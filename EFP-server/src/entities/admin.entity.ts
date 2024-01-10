import { AbstractEntity } from "src/common/entities";
import { BeforeInsert, Column, Connection, Entity, PrimaryGeneratedColumn, createConnection } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity()
export class Admin extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(admin: Partial<Admin>) {
    super();
    Object.assign(this, admin);
  }
}