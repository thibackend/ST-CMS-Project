import { Order } from '../enum/enums';
export declare class PageOptionsDto {
    search?: string;
    searchByName?: string;
    searchByEmail?: string;
    order?: Order;
    orderBy?: string;
    page?: number;
    take?: number;
    get skip(): number;
}
