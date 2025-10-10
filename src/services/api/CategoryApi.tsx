import { CategoryAnimalResponse } from "../../types/Category"
import { DataResponse } from "../../types/DataResponse"
import { api } from "../../utils/Axios"

export const categoryApi = {
    getAllCategoryAnimals: () => {
        return api.get<DataResponse<CategoryAnimalResponse>>('/categoryAnimal/get?page=0&size=100')
    }
}
