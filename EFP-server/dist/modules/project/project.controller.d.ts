import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectParams } from './dto/getList-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
        project: import("../../entities/project.entity").Project;
        message: string;
    }>;
    getTotalEmployee(period: string): Promise<{}>;
    findAll(params: GetProjectParams): Promise<import("../../common/dtos/responsePaginate").ResponsePaginate<import("../../entities/project.entity").Project>>;
    getProjectDeleted(params: GetProjectParams): Promise<import("../../common/dtos/responsePaginate").ResponsePaginate<import("../../entities/project.entity").Project>>;
    findOne(id: string): Promise<{
        project: import("../../entities/project.entity").Project;
        message: string;
    }>;
    findUnassignedEmployees(id: string): Promise<{
        unassignedEmployees: import("../../entities/employee.entity").Employee[];
        message: string;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        project: import("../../entities/project.entity").Project;
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
