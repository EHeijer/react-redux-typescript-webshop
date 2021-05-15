import { Moment } from 'moment'
import { IOrderline } from './orderline.model';

export interface IOrder {
    id?: number;
    dateCreated?: Moment;
    orderSent?: boolean;
    userId?: number;
    orderSum?: number;
    orderlines?: IOrderline[];
}

export const defaultValue: Readonly<IOrder> = {};