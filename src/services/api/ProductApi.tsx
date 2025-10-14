import { DataResponse } from "../../types/DataResponse"
import { ProductResponse } from "../../types/Product"
import { api } from "../../utils/Axios"

export const productApi = {
    getAllProducts: () => {
        return api.get<DataResponse<ProductResponse>>('/products/get?page=0&size=100')
    },
}

