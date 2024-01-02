import { CreateAssignDto } from './dto/create-assign.dto';
import { UpdateAssignDto } from './dto/update-assign.dto';
import { EmployeeProject } from 'src/entities/employee_project.entity';
import { EntityManager, Repository } from 'typeorm';
import { GetAssignParams } from './dto/getList-assign.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
export declare class AssignService {
    private assignRespository;
    private readonly entityManager;
    constructor(assignRespository: Repository<EmployeeProject>, entityManager: EntityManager);
    assignEmployeeToProject(assignDtos: CreateAssignDto[]): Promise<any[]>;
    getAssigns(params: GetAssignParams): Promise<ResponsePaginate<EmployeeProject>>;
    getAssignById(id: string): Promise<EmployeeProject>;
    update(id: string, updateProjectDto: UpdateAssignDto): Promise<void>;
    remove(data: any): Promise<{
        data: any;
        message: string;
    }>;
}
