import { AnimalRequest, AnimalResponse, AnimalUpdateRequest, AnimalUpdateResponse, AnimalUpdateStatusRequest } from "../../types/Animal";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

export const animalApi = {
    create: (animalData: AnimalRequest) => {
        return api.post<AnimalResponse>('/animals', animalData);
    },

    update: (animalUuid: string, animalData: AnimalUpdateRequest) => {
        return api.put<AnimalUpdateResponse>(`/animals/${animalUuid}`, animalData);
    },

    updateStatus: (id: string, animalUpdateStatusRequest: AnimalUpdateStatusRequest) => {
        return api.put<AnimalResponse>(`/animals/updateStatus/${id}`, animalUpdateStatusRequest);
    },

    getByStatus: () => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/status?page=0&size=100`); 
    },

    getByShelter: (id: string) => {
        return api.post<DataResponse<AnimalResponse>>(`/animals/shelter?page=0&size=100`, {shelterUuid: id}); 
    },

    getAllAvailable: (size: number, page: number) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/available?size=${size}&page=${page}`);
    }
}