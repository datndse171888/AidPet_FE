import { DataResponse } from "../../types/DataResponse"
import { ProductDetailResponse, ProductResponse } from "../../types/Product"
import { api } from "../../utils/Axios"

export const productApi = {
    getAllProducts: () => {
        return api.get<DataResponse<ProductResponse>>('/products/get?page=0&size=100')
    },

    getAllProductDetails: () => {
        return api.get<DataResponse<ProductDetailResponse>>('/productDetails/get?page=0&size=100')
    }
}

