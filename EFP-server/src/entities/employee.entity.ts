import { GenderEnum, PositionEnum, StatusEnum } from 'src/common/enum/enums';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeProject } from './employee_project.entity';
import { Project } from './project.entity';

@Entity()
export class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  identityCard: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status: StatusEnum;

  @Column({
    type: 'enum',
    enum: PositionEnum,
    default: PositionEnum.FULLSTACK,
    nullable: true,
  })
  position: PositionEnum;

  @Column({ default: false })
  isManager: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column('json', { nullable: true })
  skills: { name: string; exp: number }[];

  @Column('json', { nullable: true })
  langFrame: { name: string; exp: number }[];

  @Column('json', { nullable: true })
  tech: { name: string; exp: number }[];

  @Column({ nullable: true })
  joinDate: Date;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: Employee;

  @Column({ nullable: true })
  managerId: number;

  @OneToMany(
    () => EmployeeProject,
    (employee_project) => employee_project.employee,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  employee_project: EmployeeProject[];
    
  @OneToMany(() => Project, (project) => project.managerProject, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  project: Project[];

  @Column({ type: 'jsonb', nullable: true })
  tracking: any;

  constructor(employee: Partial<Employee>) {
    super();
    Object.assign(this, employee);
  }
}
