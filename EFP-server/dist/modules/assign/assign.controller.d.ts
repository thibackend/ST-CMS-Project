import { AssignService } from './assign.service';
import { CreateAssignDto } from './dto/create-assign.dto';
import { UpdateAssignDto } from './dto/update-assign.dto';
import { GetAssignParams } from './dto/getList-assign.dto';
import { MailService } from '../mail/mail.service';
export declare class AssignController {
    private readonly assignService;
    private readonly mailService;
    constructor(assignService: AssignService, mailService: MailService);
    create(createAssignDto: CreateAssignDto[]): Promise<any[]>;
    findAll(params: GetAssignParams): Promise<import("../../common/dtos/responsePaginate").ResponsePaginate<import("../../entities/employee_project.entity").EmployeeProject>>;
    findOne(id: string): Promise<import("../../entities/employee_project.entity").EmployeeProject>;
    update(id: string, updateAssignDto: UpdateAssignDto): Promise<void>;
    remove(data: any): Promise<{
        data: any;
        message: string;
    }>;
}
