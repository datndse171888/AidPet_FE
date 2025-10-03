import { ShelterRequest } from "../../types/Shelter";
import { api } from "../../utils/Axios";

export const shelterApi = {
    createShelter: (shelterData: ShelterRequest) => {
        return api.post('/shelters', shelterData);
    }
}