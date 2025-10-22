import { Product } from "./Product";
import { Account } from "./User";

type status = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
type paymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';

export interface Order {
    order_uuid: string;
    user: Account;
    order_datetime: string;
    total_amount: number;
    status: status;
    shipping_address: string;
    payment_status: paymentStatus;
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

export interface OrderRequest {
    userId: string;
    shippingAddress: string;
    paymentMethod: string;
    orderDetails: OrderDetailItem[];
}

export interface OrderDetailItem {
    productId: string;
    quantity: number;
}

export interface OrderResponse {
    orderId: string;
    userId: string;
    orderDateTime: string;
    totalAmount: number;
    status: status;
    shippingAddress: string;
    paymentStatus: paymentStatus;
    orderDetails: OrderDetailResponse[];
    paymentUrl: string;
}

export interface OrderDetailResponse {
    orderDetailId: string;
    productId: string;
    price: number;
    quantity: number;
    subTotal: number;
}

export interface OrderUpdateStatusRequest{
    statusOrder: paymentStatus;
}