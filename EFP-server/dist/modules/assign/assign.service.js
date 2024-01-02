"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignService = void 0;
const common_1 = require("@nestjs/common");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const enums_1 = require("../../common/enum/enums");
const pageMeta_1 = require("../../common/dtos/pageMeta");
const responsePaginate_1 = require("../../common/dtos/responsePaginate");
let AssignService = class AssignService {
    constructor(assignRespository, entityManager) {
        this.assignRespository = assignRespository;
        this.entityManager = entityManager;
    }
    async assignEmployeeToProject(assignDtos) {
        console.log(assignDtos);
        const results = [];
        for (const assignDto of assignDtos) {
            const { employeeId, projectId, roles, joinDate } = assignDto;
            const employeeProject = new employee_project_entity_1.EmployeeProject(assignDto);
            employeeProject.employeeId = employeeId;
            employeeProject.projectId = projectId;
            employeeProject.roles = roles;
            employeeProject.joinDate = joinDate;
            await this.entityManager.save(employeeProject);
            results.push({
                employeeProject,
                message: `Successfully assigned employee ${employeeId} to project ${projectId}`,
            });
        }
        return results;
    }
    async getAssigns(params) {
        const assigns = this.assignRespository
            .createQueryBuilder('employee_project')
            .select(['employee_project', 'employee'])
            .leftJoin('employee_project.employee', 'employee')
            .skip(params.skip)
            .take(params.take)
            .orderBy('employee_project.createdAt', enums_1.Order.DESC);
        if (params.id) {
            assigns.andWhere('employee_project.name ILIKE :name', {
                name: `%${params.id}%`,
            });
        }
        const [result, total] = await assigns.getManyAndCount();
        const pageMetaDto = new pageMeta_1.PageMetaDto({
            itemCount: total,
            pageOptionsDto: params,
        });
        return new responsePaginate_1.ResponsePaginate(result, pageMetaDto, 'Success');
    }
    async getAssignById(id) {
        const assign = await this.assignRespository
            .createQueryBuilder('employee_project')
            .select(['employee_project', 'employee'])
            .leftJoin('employee_project.employee', 'employee')
            .where('employee_project.id = :id', { id })
            .getOne();
        return assign;
    }
    async update(id, updateProjectDto) {
        const project = await this.assignRespository.findOneBy({ id });
        project.roles = updateProjectDto.roles;
        project.joinDate = updateProjectDto.joinDate;
        await this.entityManager.save(project);
    }
    async remove(data) {
        const { employeeIds, projectId } = data;
        const deleteResult = await this.assignRespository
            .createQueryBuilder()
            .delete()
            .from(employee_project_entity_1.EmployeeProject)
            .where('projectId = :projectId AND employeeId IN (:...employeeIds)', {
            projectId,
            employeeIds,
        })
            .execute();
        if (deleteResult.affected === 0) {
            throw new Error('Failed to unassign employee from project');
        }
        return {
            data: null,
            message: 'Successfully unassigned employee from project',
        };
    }
};
exports.AssignService = AssignService;
exports.AssignService = AssignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(employee_project_entity_1.EmployeeProject)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager])
], AssignService);
//# sourceMappingURL=assign.service.js.map