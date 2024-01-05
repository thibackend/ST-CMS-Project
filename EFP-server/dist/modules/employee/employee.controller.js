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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const getList_employee_dto_1 = require("./dto/getList_employee.dto");
const common_2 = require("@nestjs/common");
const getManager_dto_1 = require("./dto/getManager.dto");
const mail_service_1 = require("../mail/mail.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService, mailService) {
        this.employeeService = employeeService;
        this.mailService = mailService;
    }
    noPaginate() {
        return this.employeeService.getEmployeeNoPaginate();
    }
    async create(createEmployeeDto) {
        const result = await this.employeeService.create(createEmployeeDto);
        return { result, message: 'Successfully create new employee' };
    }
    async generateCv(id, res) {
        try {
            const docxBuffer = await this.employeeService.generateCv(id);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=your_cv.docx');
            res.status(common_1.HttpStatus.OK).send(docxBuffer);
        }
        catch (error) {
            console.error('Error generating CV:', error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Error generating CV');
        }
    }
    getTotalEmployee(period) {
        return this.employeeService.getTotalEmployee(period);
    }
    findAll(params) {
        return this.employeeService.getEmployees(params);
    }
    async getEmpoyeeDeleted(params) {
        return this.employeeService.getEmpoyeeDeleted(params);
    }
    async getManagers(params) {
        return this.employeeService.getManagers(params);
    }
    async findOne(id) {
        return this.employeeService.getEmployeeById(id);
    }
    async update(id, updateEmployeeDto) {
        const result = await this.employeeService.update(id, updateEmployeeDto);
        return { result, message: 'Successfully update employee' };
    }
    async remove(id) {
        const result = await this.employeeService.remove(id);
        if (result.message) {
            return { message: result.message };
        }
        else {
            return { data: result.data, message: 'Success' };
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)('noPaginate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "noPaginate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_2.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('cv'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "generateCv", null);
__decorate([
    (0, common_1.Get)('total'),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "getTotalEmployee", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getList_employee_dto_1.GetEmployeeParams]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('deleted'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getList_employee_dto_1.GetEmployeeParams]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmpoyeeDeleted", null);
__decorate([
    (0, common_1.Get)('managers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getManager_dto_1.GetManagers]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getManagers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_2.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "remove", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        mail_service_1.MailService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map