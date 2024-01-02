import { CreateProjectDto } from './create-project.dto';
interface EmployeeRolesUpdate {
    [employeeId: string]: string[];
}
declare const UpdateProjectDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    employeeRoles: EmployeeRolesUpdate;
}
export {};
