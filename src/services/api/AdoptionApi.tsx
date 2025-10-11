import { AdoptionRequest, AdoptionResponse } from "../../types/Adoption";
import { api } from "../../utils/Axios";

export const adoptionApi = {
    create: (data: AdoptionRequest) => {
        return api.post<AdoptionResponse>('/adoption', data);
    },
}