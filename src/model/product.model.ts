import { EnumDeclaration } from "typescript";

export interface IProduct {
    id?: number;
    brand?: string;
    productName?: string;
    price?: number;
    imageUrl?: string;
    removedFromShop?: boolean;
    shelfNumber?: string;
    category?: string;
}