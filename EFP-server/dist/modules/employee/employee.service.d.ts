import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeProject } from 'src/entities/employee_project.entity';
import { Project } from 'src/entities/project.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GetEmployeeParams } from './dto/getList_employee.dto';
import { GetManagers } from './dto/getManager.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeeService {
    private readonly employeesRepository;
    private readonly projectsRepository;
    private readonly assignsRepository;
    private readonly entityManager;
    constructor(employeesRepository: Repository<Employee>, projectsRepository: Repository<Project>, assignsRepository: Repository<EmployeeProject>, entityManager: EntityManager);
    generateCv(id: string): Promise<string>;
    getEmployeeNoPaginate(): Promise<Employee[]>;
    create(createEmployeeDto: CreateEmployeeDto): Promise<{
        employee: Employee;
        message: string;
    }>;
    getTotalEmployee(period: string): Promise<{}>;
    getEmployees(params: GetEmployeeParams): Promise<ResponsePaginate<Employee>>;
    getEmpoyeeDeleted(params: GetEmployeeParams): Promise<ResponsePaginate<Employee>>;
    getManagers(params: GetManagers): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<{
        employee: Employee;
        message: string;
    }>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        employee: Employee;
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
