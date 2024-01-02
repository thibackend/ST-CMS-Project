"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssignDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_assign_dto_1 = require("./create-assign.dto");
class UpdateAssignDto extends (0, mapped_types_1.PartialType)(create_assign_dto_1.CreateAssignDto) {
}
exports.UpdateAssignDto = UpdateAssignDto;
//# sourceMappingURL=update-assign.dto.js.map