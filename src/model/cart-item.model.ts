import { IProduct } from "./product.model";

export interface ICartItem {
    item: IProduct;
    quantity: number;
}