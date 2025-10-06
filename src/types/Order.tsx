import { Product } from "./Product";
import { Account } from "./User";

export interface Order {
    order_uuid: string;
    user: Account;
    order_datetime: string;
    total_amount: number;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
    shipping_address: string;
    payment_status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
    orderDetailList: OrderDetail[];
}

export interface OrderDetail {
    order_detail_uuid: string;
    order: Order;
    product: Product;
    price: number;
    quantity: number;
    sub_total: number;
}