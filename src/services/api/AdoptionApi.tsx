import { AdoptionRequest, AdoptionResponse } from "../../types/Adoption";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

export const adoptionApi = {
    create: (data: AdoptionRequest) => {
        return api.post<AdoptionResponse>('/adoption', data);
    },

    getByUser: (userId: string) => {
        return api.get<DataResponse<AdoptionResponse>>(`/adoption/user/${userId}`);
    }
}