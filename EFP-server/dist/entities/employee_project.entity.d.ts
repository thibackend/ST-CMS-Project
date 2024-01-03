import { AbstractEntity } from 'src/common/entities';
import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { PositionEnum } from 'src/common/enum/enums';
export declare class EmployeeProject extends AbstractEntity {
    id: string;
    roles: PositionEnum[];
    joinDate: Date;
    fireDate: Date;
    projectId: string;
    employeeId: string;
    project: Project;
    employee: Employee;
    formattedRoles: PositionEnum[];
    constructor(assign: Partial<EmployeeProject>);
}
