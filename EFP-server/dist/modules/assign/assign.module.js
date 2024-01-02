"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignModule = void 0;
const common_1 = require("@nestjs/common");
const assign_service_1 = require("./assign.service");
const assign_controller_1 = require("./assign.controller");
const employee_project_entity_1 = require("../../entities/employee_project.entity");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../../entities/project.entity");
const employee_entity_1 = require("../../entities/employee.entity");
let AssignModule = class AssignModule {
};
exports.AssignModule = AssignModule;
exports.AssignModule = AssignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_project_entity_1.EmployeeProject]),
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee]),
        ],
        controllers: [assign_controller_1.AssignController],
        providers: [assign_service_1.AssignService],
    })
], AssignModule);
//# sourceMappingURL=assign.module.js.map