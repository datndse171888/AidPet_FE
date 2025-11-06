import { AdoptionRequest, AdoptionResponse } from "../../types/Adoption";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

export const adoptionApi = {
    create: (data: AdoptionRequest) => {
        return api.post<AdoptionResponse>('/adoption', data);
    },

    getAll: (page: number = 0, size: number = 10) => {
        return api.get<DataResponse<AdoptionResponse>>('/adoption', { params: { page, size } });
    },

    getByUser: (userId: string) => {
        return api.get<DataResponse<AdoptionResponse>>(`/adoption/user/${userId}`);
    },

    getByShelter: () => {
        return api.get<DataResponse<AdoptionResponse>>(`/adoption/shelter`);
    }
}