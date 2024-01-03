import { StatusProjectEnum } from 'src/common/enum/enums';
import { CreateAssignDto } from 'src/modules/assign/dto/create-assign.dto';
export declare class CreateProjectDto {
    name: string;
    managerId: string;
    description: string;
    specification: string;
    status: StatusProjectEnum;
    langFrame: string[];
    technology: string[];
    startDate: Date;
    endDate: Date;
    employee_project?: CreateAssignDto[];
}
