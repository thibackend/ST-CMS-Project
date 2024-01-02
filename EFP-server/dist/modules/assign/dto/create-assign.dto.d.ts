import { PositionEnum } from 'src/common/enum/enums';
export declare class CreateAssignDto {
    employeeId: string;
    projectId: string;
    roles: PositionEnum[];
    joinDate: Date;
}
