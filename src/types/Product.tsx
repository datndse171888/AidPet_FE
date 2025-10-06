import { Category } from "./Category";
import { Supplier } from "./Supplier";

export interface Product{
    product_uuid: string;
    product_name: string;
    product_description: string;
    category: Category;
    supplier: Supplier;
    productDetails: ProductDetail[];
    imgUrl: string;
}

export interface ProductDetail{
    detail_uuid: string;
    sku: string;
    variant_name: string;
    color: string;
    storage: string;
    price: number;
    stock_quantity: number;
    image_url: string;
    product: Product;
}