import { IOrder } from "./order.model";
import { IRole } from "./role.model";

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    enabled?: boolean;
    roles?: IRole[];
    orders?: IOrder[];
}

export const defaultValue: Readonly<IUser> = {};