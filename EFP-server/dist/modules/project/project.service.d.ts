import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EntityManager, Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';
import { GetProjectParams } from './dto/getList-project.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeProject } from 'src/entities/employee_project.entity';
export declare class ProjectService {
    private projectRespository;
    private employeeRespository;
    private assignRespository;
    private readonly entityManager;
    constructor(projectRespository: Repository<Project>, employeeRespository: Repository<Employee>, assignRespository: Repository<EmployeeProject>, entityManager: EntityManager);
    create(createProjectDto: CreateProjectDto): Promise<{
        project: Project;
        message: string;
    }>;
    getTotalProject(period: string): Promise<{}>;
    getProjects(params: GetProjectParams): Promise<ResponsePaginate<Project>>;
    getProjectDeleted(params: GetProjectParams): Promise<ResponsePaginate<Project>>;
    getProjectById(id: string): Promise<{
        project: Project;
        message: string;
    }>;
    getUnassignedEmployeesInProject(id: string): Promise<{
        unassignedEmployees: Employee[];
        message: string;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        project: Project;
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
