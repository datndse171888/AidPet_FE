import { Category } from "./Category";
import { Supplier } from "./Supplier";

export interface Product {
    product_uuid: string;
    product_name: string;
    product_description: string;
    category: Category;
    supplier: Supplier;
    imgUrl: string;
    sku: string;
    variant_name: string;
    color: string;
    price: number;
    stock_quantity: number;
}

export interface ProductResponse {
    productId: string;
    productName: string;
    productDescription: string;
    imgUrl: string;
    sku: string;
    variant_name: string;
    color: string;
    storage: string;
    price: number;
    stock_quantity: number;
}