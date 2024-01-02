"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_entity_1 = require("../../entities/project.entity");
const project_controller_1 = require("./project.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../../entities/employee.entity");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
const employee_controller_1 = require("../employee/employee.controller");
const employee_service_1 = require("../employee/employee.service");
const assign_controller_1 = require("../assign/assign.controller");
const assign_service_1 = require("../assign/assign.service");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, employee_entity_1.Employee, employee_project_entity_1.EmployeeProject])],
        controllers: [project_controller_1.ProjectController, employee_controller_1.EmployeeController, assign_controller_1.AssignController],
        providers: [project_service_1.ProjectService, employee_service_1.EmployeeService, assign_service_1.AssignService],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map