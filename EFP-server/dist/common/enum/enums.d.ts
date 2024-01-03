export declare enum GenderEnum {
    MALE = "male",
    FEMALE = "female"
}
export declare enum StatusEnum {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum StatusProjectEnum {
    PENDING = "pending",
    DONE = "done",
    ON_PROGRESS = "on_progress",
    CLOSED = "closed"
}
export declare enum PositionEnum {
    FE = "fe",
    BE = "be",
    FULLSTACK = "fullstack",
    BA = "ba",
    QA = "qa",
    DEVOPS = "devops",
    UX_UI = "ux_ui"
}
export declare function getFormattedPosition(position: PositionEnum): string;
export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
