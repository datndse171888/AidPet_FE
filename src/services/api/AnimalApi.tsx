import { AnimalRequest, AnimalResponse, AnimalUpdateRequest, AnimalUpdateResponse, AnimalUpdateStatusRequest } from "../../types/Animal";
import { api } from "../../utils/Axios";

export const animalApi = {
    create: (animalData: AnimalRequest) => {
        return api.post<AnimalResponse>('/animals', animalData);
    },

    update: (animalUuid: string, animalData: AnimalUpdateRequest) => {
        return api.put<AnimalUpdateResponse>(`/animals/${animalUuid}`, animalData);
    },

    updateStatus: (id: string, animalUpdateStatusRequest: AnimalUpdateStatusRequest) => {
        return api.patch<AnimalResponse>(`/animals/updateStatus/${id}`, animalUpdateStatusRequest);
    },

    getByStatus: (size: number, page: number) => {
        return api.get<AnimalResponse[]>(`/animals/status`, {
            params: { size, page }
        });
    }
}