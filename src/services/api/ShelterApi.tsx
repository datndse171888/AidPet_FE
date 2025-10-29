import { ShelterRequest, ShelterResponse } from "../../types/Shelter";
import { api } from "../../utils/Axios";

export const shelterApi = {
    createShelter: (shelterData: ShelterRequest) => {
        return api.post<ShelterResponse>('/shelter/create', shelterData);
    }
}