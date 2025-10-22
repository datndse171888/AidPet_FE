import { OrderRequest, OrderResponse, OrderUpdateStatusRequest } from "../../types/Order";
import { api } from "../../utils/Axios";

export const orderApi = {
    createOrder: (data: OrderRequest) => {
        return api.post<OrderResponse>('/orders', data);
    },

    updateStatus: (orderId: string, data: OrderUpdateStatusRequest) => {
        return api.put<OrderResponse>(`/update/status/${orderId}`, data);
    },
}