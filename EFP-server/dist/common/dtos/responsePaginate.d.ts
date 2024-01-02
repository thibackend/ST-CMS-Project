import { PageMetaDto } from './pageMeta';
export declare class ResponsePaginate<T> {
    readonly data: T[];
    readonly meta: PageMetaDto;
    readonly message: string;
    constructor(data: T[], meta: PageMetaDto, message: string);
}
