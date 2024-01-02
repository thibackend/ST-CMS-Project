import { GenderEnum, PositionEnum, StatusEnum } from 'src/common/enum/enums';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { EmployeeProject } from './employee_project.entity';
import { Project } from './project.entity';
export declare class Employee extends AbstractEntity {
    id: string;
    email: string;
    code: string;
    name: string;
    phone: string;
    identityCard: string;
    dateOfBirth: Date;
    avatar: string;
    gender: GenderEnum;
    status: StatusEnum;
    position: PositionEnum;
    isManager: boolean;
    description: string;
    address: string;
    skills: {
        name: string;
        exp: number;
    }[];
    langFrame: {
        name: string;
        exp: number;
    }[];
    tech: {
        name: string;
        exp: number;
    }[];
    joinDate: Date;
    manager: Employee;
    managerId: number;
    employee_project: EmployeeProject[];
    project: Project[];
    tracking: any;
    constructor(employee: Partial<Employee>);
}
