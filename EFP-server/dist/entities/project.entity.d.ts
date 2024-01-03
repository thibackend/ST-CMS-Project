import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { EmployeeProject } from './employee_project.entity';
import { StatusProjectEnum } from 'src/common/enum/enums';
import { Employee } from './employee.entity';
export declare class Project extends AbstractEntity {
    id: string;
    name: string;
    managerId: string;
    managerProject: Employee;
    description: string;
    langFrame: string[];
    technology: string[];
    status: StatusProjectEnum;
    startDate: Date;
    endDate: Date;
    tracking: any;
    employee_project: EmployeeProject[];
    constructor(project: Partial<Project>);
}
