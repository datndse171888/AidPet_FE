import { api } from "../../utils/Axios"

export const CategoryApi = {
    getAllCategoryAnimals: (id: string, size: number, page: number) => {
        return api.get('/categoryAnimal', {
            params: { size, page }
        })
    }
}
