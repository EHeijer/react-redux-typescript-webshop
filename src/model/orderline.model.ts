import { IProduct } from "./product.model";

export interface IOrderline {
    id?: number;
    quantity?: number;
    sumOfOrderline?: number;
    product?: IProduct;
    orderId?: number;
}