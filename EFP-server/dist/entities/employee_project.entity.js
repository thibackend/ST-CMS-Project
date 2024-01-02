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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProject = void 0;
const entities_1 = require("../common/entities");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const project_entity_1 = require("./project.entity");
const enums_1 = require("../common/enum/enums");
let EmployeeProject = class EmployeeProject extends entities_1.AbstractEntity {
    constructor(assign) {
        super();
        Object.assign(this, assign);
    }
};
exports.EmployeeProject = EmployeeProject;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeProject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.PositionEnum,
        array: true,
        default: [enums_1.PositionEnum.BA],
    }),
    __metadata("design:type", Array)
], EmployeeProject.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EmployeeProject.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeProject.prototype, "fireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeProject.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeProject.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.employee_project, {
        cascade: true,
    }),
    __metadata("design:type", project_entity_1.Project)
], EmployeeProject.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.employee_project),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId', referencedColumnName: 'id' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeProject.prototype, "employee", void 0);
exports.EmployeeProject = EmployeeProject = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], EmployeeProject);
//# sourceMappingURL=employee_project.entity.js.map