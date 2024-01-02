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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../entities/project.entity");
const typeorm_2 = require("@nestjs/typeorm");
const enums_1 = require("../../common/enum/enums");
const pageMeta_1 = require("../../common/dtos/pageMeta");
const responsePaginate_1 = require("../../common/dtos/responsePaginate");
const employee_entity_1 = require("../../entities/employee.entity");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
let ProjectService = class ProjectService {
    constructor(projectRespository, employeeRespository, assignRespository, entityManager) {
        this.projectRespository = projectRespository;
        this.employeeRespository = employeeRespository;
        this.assignRespository = assignRespository;
        this.entityManager = entityManager;
    }
    async create(createProjectDto) {
        const { employee_project, ...projectData } = createProjectDto;
        const project = new project_entity_1.Project(projectData);
        await this.entityManager.save(project_entity_1.Project, project);
        if (employee_project && employee_project.length > 0) {
            const employeeProjects = employee_project.map((employeeData) => {
                const { employeeId, roles } = employeeData;
                const employeeProject = new employee_project_entity_1.EmployeeProject({
                    employeeId,
                    roles,
                    joinDate: new Date(),
                    fireDate: null,
                    project,
                });
                return employeeProject;
            });
            await this.entityManager.save(employee_project_entity_1.EmployeeProject, employeeProjects);
        }
        return {
            project,
            message: 'Successfully created a project with assigned employees',
        };
    }
    async getTotalProject(period) {
        const total = await this.projectRespository.count();
        const pastYear = new Date();
        pastYear.setFullYear(pastYear.getFullYear() - 1);
        let oldCount, currentCount, oldDoneCount, currentDoneCount;
        const pendingCount = await this.projectRespository
            .createQueryBuilder('project')
            .where('project.status = :status', { status: 'pending' })
            .getCount();
        const onProgressCount = await this.projectRespository
            .createQueryBuilder('project')
            .where('project.status = :status', { status: 'on_progress' })
            .getCount();
        const doneCount = await this.projectRespository
            .createQueryBuilder('project')
            .where('project.status = :status', { status: 'done' })
            .getCount();
        if (period === 'year') {
            oldCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('EXTRACT(YEAR FROM project.createdAt) = :pastYear', {
                pastYear: pastYear.getFullYear(),
            })
                .getCount();
            currentCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('EXTRACT(YEAR FROM project.createdAt) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .getCount();
            oldDoneCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('project.status = :status', { status: 'done' })
                .andWhere('EXTRACT(YEAR FROM project.endDate) = :oldYear', {
                oldYear: pastYear.getFullYear(),
            })
                .getCount();
            currentDoneCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('project.status = :status', { status: 'done' })
                .andWhere('EXTRACT(YEAR FROM project.endDate) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .getCount();
        }
        else if (period === 'month') {
            oldCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('EXTRACT(YEAR FROM project.createdAt) = :pastYear', {
                pastYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM project.createdAt) = :pastMonth', {
                pastMonth: pastYear.getMonth(),
            })
                .getCount();
            currentCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('EXTRACT(YEAR FROM project.createdAt) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM project.createdAt) = :currentMonth', {
                currentMonth: new Date().getMonth() + 1,
            })
                .getCount();
            oldDoneCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('project.status = :status', { status: 'done' })
                .andWhere('EXTRACT(YEAR FROM project.endDate) = :pastYear', {
                pastYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM project.endDate) = :pastMonth', {
                pastMonth: pastYear.getMonth(),
            })
                .getCount();
            currentDoneCount = await this.projectRespository
                .createQueryBuilder('project')
                .where('project.status = :status', { status: 'done' })
                .andWhere('EXTRACT(YEAR FROM project.endDate) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM project.endDate) = :currentMonth', {
                currentMonth: new Date().getMonth() + 1,
            })
                .getCount();
        }
        else if (period === 'count_join') {
            const currentYear = new Date().getFullYear();
            const joinCounts = {};
            for (let month = 0; month < 12; month++) {
                const count = await this.projectRespository
                    .createQueryBuilder('project')
                    .where('EXTRACT(YEAR FROM project.startDate) = :year', {
                    year: currentYear,
                })
                    .andWhere('EXTRACT(MONTH FROM project.startDate) = :month', {
                    month: month + 1,
                })
                    .getCount();
                joinCounts[month + 1] = count;
            }
            return joinCounts;
        }
        const percentageProjectChange = oldCount === 0 ? 100 : ((currentCount - oldCount) / oldCount) * 100;
        const percentageDoneChange = oldDoneCount === 0
            ? 100
            : ((currentDoneCount - oldDoneCount) / oldDoneCount) * 100;
        const pendingPercentage = (pendingCount / total) * 100;
        const onProgressPercentage = (onProgressCount / total) * 100;
        const donePercentage = (doneCount / total) * 100;
        return {
            total,
            oldCount,
            currentCount,
            percentageProjectChange,
            oldDoneCount,
            currentDoneCount,
            percentageDoneChange,
            pendingPercentage,
            onProgressPercentage,
            donePercentage,
        };
    }
    async getProjects(params) {
        const projects = this.projectRespository
            .createQueryBuilder('project')
            .select([
            'project',
            'manager.code',
            'manager.name',
            'manager.avatar',
            'manager.email',
            'employee_project',
            'employee_project.roles',
            'employee_project.joinDate',
            'employee_project.fireDate',
            'employee_project.employeeId',
            'employee.name',
            'employee.email',
            'employee.code',
            'employee.avatar',
        ])
            .leftJoin('project.managerProject', 'manager')
            .leftJoin('project.employee_project', 'employee_project')
            .leftJoin('employee_project.employee', 'employee')
            .andWhere('project.status = ANY(:status)', {
            status: params.status
                ? [params.status]
                : [
                    enums_1.StatusProjectEnum.DONE,
                    enums_1.StatusProjectEnum.ON_PROGRESS,
                    enums_1.StatusProjectEnum.PENDING,
                    enums_1.StatusProjectEnum.CLOSED,
                ],
        })
            .skip(params.skip)
            .take(params.take)
            .orderBy('project.createdAt', enums_1.Order.DESC);
        if (params.search) {
            projects.andWhere('project.name ILIKE :name', {
                name: `%${params.search}%`,
            });
        }
        const [result, total] = await projects.getManyAndCount();
        const pageMetaDto = new pageMeta_1.PageMetaDto({
            itemCount: total,
            pageOptionsDto: params,
        });
        return new responsePaginate_1.ResponsePaginate(result, pageMetaDto, 'Successfully');
    }
    async getProjectDeleted(params) {
        const projects = this.projectRespository
            .createQueryBuilder('project')
            .select([
            'project',
            'manager.code',
            'manager.name',
            'manager.avatar',
            'manager.email',
            'employee_project',
            'employee_project.roles',
            'employee_project.joinDate',
            'employee_project.fireDate',
            'employee_project.employeeId',
            'employee.name',
            'employee.email',
            'employee.code',
            'employee.avatar',
        ])
            .leftJoin('project.managerProject', 'manager')
            .leftJoin('project.employee_project', 'employee_project')
            .leftJoin('employee_project.employee', 'employee')
            .andWhere('project.status = ANY(:status)', {
            status: params.status
                ? [params.status]
                : [
                    enums_1.StatusProjectEnum.DONE,
                    enums_1.StatusProjectEnum.ON_PROGRESS,
                    enums_1.StatusProjectEnum.PENDING,
                    enums_1.StatusProjectEnum.CLOSED,
                ],
        })
            .where('project.deletedAt IS NOT NULL')
            .skip(params.skip)
            .take(params.take)
            .withDeleted()
            .orderBy('project.createdAt', enums_1.Order.DESC);
        if (params.search) {
            projects.andWhere('project.name ILIKE :name', {
                name: `%${params.search}%`,
            });
        }
        const [result, total] = await projects.getManyAndCount();
        const pageMetaDto = new pageMeta_1.PageMetaDto({
            itemCount: total,
            pageOptionsDto: params,
        });
        return new responsePaginate_1.ResponsePaginate(result, pageMetaDto, 'Successfully');
    }
    async getProjectById(id) {
        const project = await this.projectRespository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.managerProject', 'manager')
            .leftJoinAndSelect('project.employee_project', 'employee_project')
            .leftJoinAndSelect('employee_project.employee', 'employee')
            .where('project.id = :id', { id })
            .getOne();
        if (project) {
            const projectEmployeesWithDeletedAt = await this.entityManager
                .getRepository(employee_project_entity_1.EmployeeProject)
                .createQueryBuilder('employee_project')
                .leftJoinAndSelect('employee_project.employee', 'employee')
                .leftJoinAndSelect('employee_project.project', 'project')
                .where('project.id = :id', { id })
                .withDeleted()
                .getMany();
            const tracking = projectEmployeesWithDeletedAt.map((projectEmployee) => ({
                id: projectEmployee.employee.id,
                employeeName: projectEmployee.employee?.name,
                roles: projectEmployee.roles,
                joinDate: projectEmployee.joinDate,
                doneDate: projectEmployee.deletedAt,
            }));
            project.tracking = {
                joinDate: project.startDate,
                member: tracking,
                fireDate: project.endDate,
            };
        }
        return {
            project,
            message: 'Successfully get project',
        };
    }
    async getUnassignedEmployeesInProject(id) {
        const project = await this.projectRespository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.employee_project', 'employee_project')
            .leftJoinAndSelect('employee_project.employee', 'employee')
            .where('project.id = :id', { id })
            .getOne();
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const allEmployees = await this.employeeRespository.find();
        const unassignedEmployees = allEmployees.filter((employee) => {
            return (!project.employee_project.some((assignedEmployee) => assignedEmployee.employeeId === employee.id) && employee.status === 'active');
        });
        return {
            unassignedEmployees,
            message: 'Successfully get all unassigned Employees',
        };
    }
    async update(id, updateProjectDto) {
        const project = await this.projectRespository.findOneBy({ id });
        console.log(updateProjectDto);
        console.log(project);
        project.name = updateProjectDto.name;
        project.managerId = updateProjectDto.managerId;
        project.description = updateProjectDto.description;
        project.specification = updateProjectDto.specification;
        project.status = updateProjectDto.status;
        project.langFrame = updateProjectDto.langFrame;
        project.technology = updateProjectDto.technology;
        project.startDate = updateProjectDto.startDate;
        project.endDate = updateProjectDto.endDate;
        if (updateProjectDto.employeeRoles) {
            for (const employeeId in updateProjectDto.employeeRoles) {
                const employeeProject = await this.assignRespository.findOne({
                    where: { projectId: id, employeeId },
                });
                if (employeeProject) {
                    employeeProject.roles = updateProjectDto.employeeRoles[employeeId];
                    console.log(employeeProject);
                    await this.entityManager.save(employeeProject);
                }
                else {
                }
            }
        }
        await this.entityManager.save(project);
        return { project, message: 'Successfully update project' };
    }
    async remove(id) {
        const project = await this.projectRespository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.employee_project', 'employee_project')
            .where('project.id = :id', { id })
            .getOne();
        if (!project) {
            return { message: 'Project not found' };
        }
        if (project.employee_project.length > 0) {
            for (const empProject of project.employee_project) {
                await this.entityManager.remove(empProject);
            }
        }
        await this.projectRespository.softDelete(id);
        return { data: null, message: 'Employee deletion successful' };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_2.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_2.InjectRepository)(employee_project_entity_1.EmployeeProject)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.EntityManager])
], ProjectService);
//# sourceMappingURL=project.service.js.map