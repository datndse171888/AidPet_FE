import { AnimalRequest, AnimalResponse, AnimalUpdateRequest, AnimalUpdateResponse, AnimalUpdateStatusRequest } from "../../types/Animal";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

export const animalApi = {
    // Create a new animal
    create: (animalData: AnimalRequest) => {
        return api.post<AnimalResponse>('/animals', animalData);
    },

    // Update animal information
    update: (animalUuid: string, animalData: AnimalUpdateRequest) => {
        return api.put<AnimalUpdateResponse>(`/animals/${animalUuid}`, animalData);
    },

    // Update animal status
    updateStatus: (id: string, animalUpdateStatusRequest: AnimalUpdateStatusRequest) => {
        return api.put<AnimalResponse>(`/animals/updateStatus/${id}`, animalUpdateStatusRequest);
    },

    // Get animals by shelter
    getByShelter: (id: string, size: number = 100, page: number = 0) => {
        return api.post<DataResponse<AnimalResponse>>(`/animals/shelter?size=${size}&page=${page}`, { shelterUuid: id });
    },

    // Get all available animals
    getAllAvailable: (size: number = 100, page: number = 0) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/available?size=${size}&page=${page}`);
    },

    // Get all animals with pagination
    getAll: (size: number = 100, page: number = 0) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/get?page=${page}&size=${size}`);
    },

    // Get all animals with status (for admin)
    getByStatus: (size: number = 100, page: number = 0) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/status?page=${page}&size=${size}`);
    },

    // Get animal by ID
    getById: (id: string) => {
        return api.get<AnimalResponse>(`/animals/get/${id}`);
    },

    // Delete animal
    delete: (id: string) => {
        return api.delete(`/animals/${id}`);
    },

    // Search animals
    search: (query: string, size: number = 10, page: number = 0,) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/search?query=${query}&page=${page}&size=${size}`);
    },

    // Get animals by category
    getByCategory: (categoryId: string, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/category/${categoryId}?page=${page}&size=${size}`);
    },

    // Get animals by breed
    getByBreed: (breed: string, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/breed/${breed}?page=${page}&size=${size}`);
    },

    // Get animals by age range
    getByAgeRange: (minAge: number, maxAge: number, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<AnimalResponse>>(`/animals/age-range?minAge=${minAge}&maxAge=${maxAge}&page=${page}&size=${size}`);
    },

    // Get featured animals
    getFeatured: (limit: number = 10) => {
        return api.get<AnimalResponse[]>(`/animals/featured?limit=${limit}`);
    },

    // Get recently added animals
    getRecent: (limit: number = 10) => {
        return api.get<AnimalResponse[]>(`/animals/recent?limit=${limit}`);
    }
}