export declare class ResponseItem<T> {
    readonly data: T[] | T;
    readonly message: string;
    constructor(data: T[] | T, message: string);
}
