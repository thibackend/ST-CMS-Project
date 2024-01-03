import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeParams } from './dto/getList_employee.dto';
import { GetManagers } from './dto/getManager.dto';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
export declare class EmployeeController {
    private readonly employeeService;
    private readonly mailService;
    constructor(employeeService: EmployeeService, mailService: MailService);
    noPaginate(): Promise<import("../../entities/employee.entity").Employee[]>;
    create(createEmployeeDto: CreateEmployeeDto): Promise<{
        result: {
            employee: import("../../entities/employee.entity").Employee;
            message: string;
        };
        message: string;
    }>;
    generateCv(id: string, res: Response): Promise<void>;
    getTotalEmployee(period: string): Promise<{}>;
    findAll(params: GetEmployeeParams): Promise<import("../../common/dtos/responsePaginate").ResponsePaginate<import("../../entities/employee.entity").Employee>>;
    getEmpoyeeDeleted(params: GetEmployeeParams): Promise<import("../../common/dtos/responsePaginate").ResponsePaginate<import("../../entities/employee.entity").Employee>>;
    getManagers(params: GetManagers): Promise<import("../../entities/employee.entity").Employee[]>;
    findOne(id: string): Promise<{
        employee: import("../../entities/employee.entity").Employee;
        message: string;
    }>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        result: {
            employee: import("../../entities/employee.entity").Employee;
            message: string;
        };
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        data: any;
        message: string;
    }>;
}
