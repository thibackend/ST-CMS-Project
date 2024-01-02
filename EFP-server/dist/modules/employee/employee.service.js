"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const pageMeta_1 = require("../../common/dtos/pageMeta");
const responsePaginate_1 = require("../../common/dtos/responsePaginate");
const enums_1 = require("../../common/enum/enums");
const employee_entity_1 = require("../../entities/employee.entity");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
const project_entity_1 = require("../../entities/project.entity");
const typeorm_2 = require("typeorm");
const docxtemplater_1 = __importDefault(require("docxtemplater"));
let EmployeeService = class EmployeeService {
    constructor(employeesRepository, projectsRepository, assignsRepository, entityManager) {
        this.employeesRepository = employeesRepository;
        this.projectsRepository = projectsRepository;
        this.assignsRepository = assignsRepository;
        this.entityManager = entityManager;
    }
    async generateCv(id) {
        const { employee } = await this.getEmployeeById(id);
        function getFormattedRoles(roles) {
            return roles.map((role) => (0, enums_1.getFormattedPosition)(role)).join(', ');
        }
        const dataDocx = {
            name: employee.name,
            address: employee.address,
            email: employee.email,
            date: `${new Date(employee.createdAt).getMonth() + 1}/${new Date(employee.createdAt).getFullYear()}`,
            position: (0, enums_1.getFormattedPosition)(employee.position),
            lang_frame: employee.langFrame
                ?.map(function (item) {
                return (item.name.charAt(0).toUpperCase() +
                    item.name.slice(1));
            })
                .join(', ') ?? '',
            technical: employee.tech
                ?.map(function (item) {
                return (item.name.charAt(0).toUpperCase() +
                    item.name.slice(1));
            })
                .join(', ') ?? '',
            projects: employee.employee_project.map((item) => {
                return {
                    project_name: item.project.name,
                    role: getFormattedRoles(item.roles),
                    description: item.project.description,
                    specification: item.project.specification,
                    lang_frame_project: item.project.langFrame
                        .map((item) => item?.charAt(0).toUpperCase() + item?.slice(1))
                        .join(', ') ?? '',
                    tech_project: item.project.technology
                        .map((item) => item?.charAt(0).toUpperCase() + item?.slice(1))
                        .join(', ') ?? '',
                };
            }),
            skills: [
                ...employee.langFrame.map((item) => ({
                    name: item.name,
                    exp: item.exp,
                })),
                ...employee.tech.map((item) => ({
                    name: item.name,
                    exp: item.exp,
                })),
            ],
        };
        const content = fs.readFileSync(path_1.default.resolve('template2.docx'), 'binary');
        const zip = new pizzip_1.default(content);
        const doc = new docxtemplater_1.default(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render(dataDocx);
        const buf = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });
        return Buffer.from(buf).toString('hex');
    }
    async getEmployeeNoPaginate() {
        return await this.employeesRepository.find();
    }
    async create(createEmployeeDto) {
        const existingEmployee = await this.employeesRepository.findOne({
            where: [
                { code: createEmployeeDto.code },
                { email: createEmployeeDto.email },
            ],
        });
        if (existingEmployee) {
            if (existingEmployee.code === createEmployeeDto.code) {
                throw new common_1.BadRequestException(`Employee with code ${createEmployeeDto.code} already exists.`);
            }
            else if (existingEmployee.email === createEmployeeDto.email) {
                throw new common_1.BadRequestException(`Employee with email ${createEmployeeDto.email} already exists.`);
            }
        }
        const employee = new employee_entity_1.Employee(createEmployeeDto);
        await this.entityManager.save(employee);
        return { employee, message: 'Successfully create employee' };
    }
    async getTotalEmployee(period) {
        const total = await this.employeesRepository.count();
        const pastYear = new Date();
        pastYear.setFullYear(pastYear.getFullYear() - 1);
        let oldCount, currentCount;
        if (period === 'year') {
            oldCount = await this.employeesRepository
                .createQueryBuilder('employee')
                .where('EXTRACT(YEAR FROM employee.createdAt) = :pastYear', {
                pastYear: pastYear.getFullYear(),
            })
                .getCount();
            currentCount = await this.employeesRepository
                .createQueryBuilder('employee')
                .where('EXTRACT(YEAR FROM employee.createdAt) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .getCount();
        }
        else if (period === 'month') {
            oldCount = await this.employeesRepository
                .createQueryBuilder('employee')
                .where('EXTRACT(YEAR FROM employee.createdAt) = :pastYear', {
                pastYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM employee.createdAt) = :pastMonth', {
                pastMonth: pastYear.getMonth(),
            })
                .getCount();
            currentCount = await this.employeesRepository
                .createQueryBuilder('project')
                .where('EXTRACT(YEAR FROM project.createdAt) = :currentYear', {
                currentYear: new Date().getFullYear(),
            })
                .andWhere('EXTRACT(MONTH FROM project.createdAt) = :currentMonth', {
                currentMonth: new Date().getMonth() + 1,
            })
                .getCount();
        }
        else if (period === 'count_join') {
            const currentYear = new Date().getFullYear();
            const joinCounts = {};
            for (let month = 0; month < 12; month++) {
                const formattedDate = `${currentYear}/${String(month + 1).padStart(2, '0')}/01`;
                const count = await this.employeesRepository
                    .createQueryBuilder('employee')
                    .where('EXTRACT(YEAR FROM employee.joinDate) = :year', {
                    year: currentYear,
                })
                    .andWhere('EXTRACT(MONTH FROM employee.joinDate) = :month', {
                    month: month + 1,
                })
                    .getCount();
                joinCounts[formattedDate] = count;
            }
            return joinCounts;
        }
        const percentageChange = oldCount === 0 ? 100 : ((currentCount - oldCount) / oldCount) * 100;
        return { oldCount, currentCount, total, percentageChange };
    }
    async getEmployees(params) {
        const employees = this.employeesRepository
            .createQueryBuilder('employee')
            .select([
            'employee',
            'manager.name',
            'manager.code',
            'manager.email',
            'manager.phone',
        ])
            .leftJoin('employee.manager', 'manager')
            .leftJoinAndSelect('employee.employee_project', 'employee_project')
            .leftJoinAndSelect('employee_project.project', 'project')
            .skip(params.skip)
            .take(params.take)
            .orderBy('employee.createdAt', enums_1.Order.DESC);
        if (params.searchByName) {
            employees.andWhere('employee.name ILIKE :name', {
                name: `%${params.searchByName}%`,
            });
        }
        if (params.searchByEmail) {
            employees.andWhere('employee.email ILIKE :email', {
                email: `%${params.searchByEmail}%`,
            });
        }
        const [result, total] = await employees.getManyAndCount();
        const pageMetaDto = new pageMeta_1.PageMetaDto({
            itemCount: total,
            pageOptionsDto: params,
        });
        return new responsePaginate_1.ResponsePaginate(result, pageMetaDto, 'Successfully ');
    }
    async getEmpoyeeDeleted(params) {
        const deletedEmployees = await this.employeesRepository
            .createQueryBuilder('employee')
            .select([
            'employee',
            'manager.name',
            'manager.code',
            'manager.email',
            'manager.phone',
        ])
            .leftJoin('employee.manager', 'manager')
            .leftJoinAndSelect('employee.employee_project', 'employee_project')
            .leftJoinAndSelect('employee_project.project', 'project')
            .where('employee.deletedAt IS NOT NULL')
            .skip(params.skip)
            .take(params.take)
            .withDeleted()
            .orderBy('employee.createdAt', enums_1.Order.DESC);
        if (params.searchByName) {
            deletedEmployees.andWhere('employee.name ILIKE :name', {
                name: `%${params.searchByName}%`,
            });
        }
        if (params.searchByEmail) {
            deletedEmployees.andWhere('employee.email ILIKE :email', {
                email: `%${params.searchByEmail}%`,
            });
        }
        const [result, total] = await deletedEmployees.getManyAndCount();
        const pageMetaDto = new pageMeta_1.PageMetaDto({
            itemCount: total,
            pageOptionsDto: params,
        });
        return new responsePaginate_1.ResponsePaginate(result, pageMetaDto, 'Successfully');
    }
    async getManagers(params) {
        try {
            const managers = await this.employeesRepository
                .createQueryBuilder('employee')
                .where('employee.isManager = :isManager', { isManager: true })
                .skip(params.skip)
                .take(params.take)
                .getMany();
            return managers;
        }
        catch (error) {
            console.error('Error in getManagers:', error);
            throw error;
        }
    }
    async getEmployeeById(id) {
        const managerProjects = await this.entityManager
            .getRepository(project_entity_1.Project)
            .createQueryBuilder('project')
            .select([
            'project.id',
            'project.name',
            'project.startDate',
            'project.endDate',
        ])
            .where('project.managerId = :id', { id })
            .getMany();
        const managerTracking = managerProjects.map((project) => ({
            projectName: project.name,
            joinDate: project.startDate,
            doneDate: project.endDate,
            role: 'manager',
        }));
        const employeeProjects = await this.entityManager
            .getRepository(employee_project_entity_1.EmployeeProject)
            .createQueryBuilder('employee_project')
            .select([
            'employee_project.roles',
            'employee_project.joinDate',
            'employee_project.fireDate',
            'project.id',
            'project.name',
            'project.startDate',
            'project.endDate',
        ])
            .leftJoin('employee_project.project', 'project')
            .where('employee_project.employeeId = :id', { id })
            .withDeleted()
            .getMany();
        const otherRolesTracking = employeeProjects.map((employeeProject) => ({
            projectName: employeeProject.project.name,
            joinDate: employeeProject.joinDate,
            doneDate: employeeProject.fireDate || employeeProject.project.endDate,
            role: employeeProject.roles,
        }));
        const projects = [...managerTracking, ...otherRolesTracking];
        const employee = await this.employeesRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.employee_project', 'employee_project')
            .leftJoinAndSelect('employee_project.project', 'project')
            .where('employee.id = :id', { id })
            .getOne();
        if (employee) {
            const managerTracking = projects.filter((item) => item.role === 'manager');
            const otherRolesTracking = projects.filter((item) => item.role !== 'manager');
            employee.tracking = {
                joinDate: employee.joinDate,
                projects,
                fireDate: employee.deletedAt,
            };
        }
        return { employee, message: 'Successfully get data of employee' };
    }
    async update(id, updateEmployeeDto) {
        const employee = await this.employeesRepository.findOneBy({ id });
        if (employee) {
            employee.name = updateEmployeeDto.name;
            employee.email = updateEmployeeDto.email;
            employee.phone = updateEmployeeDto.phone;
            employee.address = updateEmployeeDto.address;
            employee.gender = updateEmployeeDto.gender;
            employee.identityCard = updateEmployeeDto.identityCard;
            employee.dateOfBirth = updateEmployeeDto.dateOfBirth;
            employee.position = updateEmployeeDto.position;
            employee.description = updateEmployeeDto.description;
            employee.status = updateEmployeeDto.status;
            employee.langFrame = updateEmployeeDto.langFrame;
            employee.tech = updateEmployeeDto.tech;
            employee.skills = updateEmployeeDto.skills;
            employee.avatar = updateEmployeeDto.avatar;
            employee.joinDate = updateEmployeeDto.joinDate;
            employee.managerId = updateEmployeeDto.managerId;
            employee.isManager = updateEmployeeDto.isManager;
            await this.entityManager.save(employee);
            return { employee, message: 'Successfully update employee' };
        }
    }
    async remove(id) {
        const employee = await this.employeesRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.employee_project', 'employee_project')
            .where('employee.id = :id', { id })
            .getOne();
        if (!employee) {
            return { message: 'Employee not found' };
        }
        const isManager = await this.employeesRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.project', 'project')
            .where('employee.id = :id', { id })
            .andWhere('project.managerId = :id', { id })
            .getCount();
        if (isManager > 0) {
            return {
                data: null,
                message: 'Employee is a manager of a project. Cannot delete.',
            };
        }
        if (employee.employee_project.length > 0) {
            for (const empProject of employee.employee_project) {
                await this.entityManager.remove(empProject);
            }
        }
        await this.employeesRepository.softDelete(id);
        return { data: null, message: 'Employee deletion successful' };
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map