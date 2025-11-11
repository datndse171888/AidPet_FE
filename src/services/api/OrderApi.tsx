import { DataResponse } from "../../types/DataResponse";
import { OrderRequest, OrderResponse, OrderUpdateStatusRequest } from "../../types/Order";
import { api } from "../../utils/Axios";

export const orderApi = {
    createOrder: (data: OrderRequest) => {
        return api.post<OrderResponse>('/orders', data);
    },

    updateStatus: (orderId: string, data: OrderUpdateStatusRequest) => {
        return api.put<OrderResponse>(`/orders/update/status/${orderId}`, data);
    },

    getOrderByUser: (userId: string) => {
        return api.get<DataResponse<OrderResponse>>(`/orders/user/${userId}`);
    },

    getAllOrders: (page: number = 0, size: number = 10) => {
        return api.get<DataResponse<OrderResponse>>(`/orders?page=${page}&size=${size}`);
    },
}