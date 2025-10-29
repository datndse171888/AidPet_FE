import { Product } from "./Product";

export interface Supplier {
    supplier_uuid: string;
    supplier_name: string;
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    productList: Product[];
}