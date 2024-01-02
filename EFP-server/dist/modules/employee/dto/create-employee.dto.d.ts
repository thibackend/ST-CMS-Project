import { GenderEnum, PositionEnum, StatusEnum } from 'src/common/enum/enums';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeProject } from 'src/entities/employee_project.entity';
export declare class CreateEmployeeDto {
    name: string;
    code: string;
    email: string;
    gender: GenderEnum;
    phone: string;
    dateOfBirth: Date;
    identityCard: string;
    position: PositionEnum;
    isManager: boolean;
    description: string;
    langFrame: {
        name: string;
        exp: number;
    }[];
    tech: {
        name: string;
        exp: number;
    }[];
    skills: {
        name: string;
        exp: number;
    }[];
    status: StatusEnum;
    avatar: string;
    joinDate: Date;
    fireDate: Date | null;
    manager: Employee;
    managerId: number;
    employee_project: EmployeeProject[];
}
