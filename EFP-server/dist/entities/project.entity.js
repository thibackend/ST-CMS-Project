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
exports.Project = void 0;
const abstract_entity_1 = require("../common/entities/abstract.entity");
const typeorm_1 = require("typeorm");
const employee_project_entity_1 = require("./employee_project.entity");
const enums_1 = require("../common/enum/enums");
const employee_entity_1 = require("./employee.entity");
let Project = class Project extends abstract_entity_1.AbstractEntity {
    constructor(project) {
        super();
        Object.assign(this, project);
    }
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "managerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.project),
    (0, typeorm_1.JoinColumn)({ name: 'managerId', referencedColumnName: 'id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Project.prototype, "managerProject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: false }),
    __metadata("design:type", Array)
], Project.prototype, "langFrame", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: false }),
    __metadata("design:type", Array)
], Project.prototype, "technology", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusProjectEnum,
        default: enums_1.StatusProjectEnum.PENDING,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "tracking", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_project_entity_1.EmployeeProject, (employee_project) => employee_project.project),
    __metadata("design:type", Array)
], Project.prototype, "employee_project", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Project);
//# sourceMappingURL=project.entity.js.map