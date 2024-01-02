"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.getFormattedPosition = exports.PositionEnum = exports.StatusProjectEnum = exports.StatusEnum = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ACTIVE"] = "active";
    StatusEnum["INACTIVE"] = "inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var StatusProjectEnum;
(function (StatusProjectEnum) {
    StatusProjectEnum["PENDING"] = "pending";
    StatusProjectEnum["DONE"] = "done";
    StatusProjectEnum["ON_PROGRESS"] = "on_progress";
    StatusProjectEnum["CLOSED"] = "closed";
})(StatusProjectEnum || (exports.StatusProjectEnum = StatusProjectEnum = {}));
var PositionEnum;
(function (PositionEnum) {
    PositionEnum["FE"] = "fe";
    PositionEnum["BE"] = "be";
    PositionEnum["FULLSTACK"] = "fullstack";
    PositionEnum["BA"] = "ba";
    PositionEnum["QA"] = "qa";
    PositionEnum["DEVOPS"] = "devops";
    PositionEnum["UX_UI"] = "ux_ui";
})(PositionEnum || (exports.PositionEnum = PositionEnum = {}));
function getFormattedPosition(position) {
    switch (position) {
        case PositionEnum.FE:
            return 'Front-end Developer';
        case PositionEnum.BE:
            return 'Back-end Developer';
        case PositionEnum.FULLSTACK:
            return 'Full Stack Developer';
        case PositionEnum.BA:
            return 'Business Analyst';
        case PositionEnum.QA:
            return 'Quality Assurance';
        case PositionEnum.DEVOPS:
            return 'DevOps';
        case PositionEnum.UX_UI:
            return 'UX/UI';
        default:
            return '';
    }
}
exports.getFormattedPosition = getFormattedPosition;
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (exports.Order = Order = {}));
//# sourceMappingURL=enums.js.map