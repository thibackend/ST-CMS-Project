"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_controller_1 = require("./employee.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../../entities/employee.entity");
const project_entity_1 = require("../../entities/project.entity");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
const employee_service_1 = require("./employee.service");
const assign_service_1 = require("../assign/assign.service");
const assign_controller_1 = require("../assign/assign.controller");
let EmployeeModule = class EmployeeModule {
    static forFeature(arg0) {
        throw new Error('Method not implemented.');
    }
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee]),
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            typeorm_1.TypeOrmModule.forFeature([employee_project_entity_1.EmployeeProject]),
        ],
        controllers: [employee_controller_1.EmployeeController, assign_controller_1.AssignController],
        providers: [employee_service_1.EmployeeService, assign_service_1.AssignService],
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map