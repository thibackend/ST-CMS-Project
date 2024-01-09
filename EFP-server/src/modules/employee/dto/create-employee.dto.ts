import { IsNotEmpty } from 'class-validator';
import { GenderEnum, PositionEnum, StatusEnum } from 'src/common/enum/enums';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeProject } from 'src/entities/employee_project.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  gender: GenderEnum;

  @IsNotEmpty()
  phone: string;

  dateOfBirth: Date;

  identityCard: string;

  @IsNotEmpty()
  position: PositionEnum;

  @IsNotEmpty()
  isManager: boolean;

  description: string;

  langFrame: { name: string; exp: number }[];

  tech: { name: string; exp: number }[];

  skills: { name: string; exp: number }[];

  status: StatusEnum;

  avatar: string;

  joinDate: Date;

  fireDate: Date | null;

  manager: Employee;

  managerId: number;

  employee_project: EmployeeProject[];
}
