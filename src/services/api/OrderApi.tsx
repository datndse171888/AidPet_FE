import { OrderRequest, OrderResponse } from "../../types/Order";
import { api } from "../../utils/Axios";

export const orderApi = {
    createOrder: (data: OrderRequest) => {
        return api.post<OrderResponse>('/orders', data);
    }
}