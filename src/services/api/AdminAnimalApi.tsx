import { api } from "../../utils/Axios";
import { AnimalResponse, AnimalUpdateRequest } from "../../types/Animal";

type DataResponse<T> = {
  data: T | T[];
  total?: number;
  page?: number;
  size?: number;
};

export const adminAnimalApi = {
  // Get all animals with pagination
  getAllAnimals: (page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals?page=${page}&size=${size}`);
  },

  // Get animals with filters
  getAnimalsWithFilters: (filters: any, page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString(), ...filters }).toString();
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/filter?${params}`);
  },

  // Get animal by ID
  getAnimalById: (animalId: string) => {
    return api.get<AnimalResponse>(`/admin/animals/${animalId}`);
  },

  // Update animal
  updateAnimal: (animalId: string, animalData: AnimalUpdateRequest) => {
    return api.put<AnimalResponse>(`/admin/animals/${animalId}`, animalData);
  },

  // Update animal status
  updateAnimalStatus: (animalId: string, status: string) => {
    return api.put<AnimalResponse>(`/admin/animals/${animalId}/status`, { status });
  },

  // Delete animal
  deleteAnimal: (animalId: string) => {
    return api.delete(`/admin/animals/${animalId}`);
  },

  // Bulk update animal status
  bulkUpdateAnimalStatus: (animalIds: string[], status: string) => {
    return api.put<{ success: number; failed: number }>('/admin/animals/bulk-status', { animalIds, status });
  },

  // Get animal statistics
  getAnimalStats: () => {
    return api.get<any>('/admin/animals/stats');
  },

  // Search animals
  searchAnimals: (query: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/search?query=${query}&page=${page}&size=${size}`);
  },

  // Get animals by status
  getAnimalsByStatus: (status: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/status/${status}?page=${page}&size=${size}`);
  },

  // Get animals by category
  getAnimalsByCategory: (categoryId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/category/${categoryId}?page=${page}&size=${size}`);
  },

  // Get animals by shelter
  getAnimalsByShelter: (shelterId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/shelter/${shelterId}?page=${page}&size=${size}`);
  },

  // Get pending animals for approval
  getPendingAnimals: (page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AnimalResponse>>(`/admin/animals/pending?page=${page}&size=${size}`);
  },

  // Approve animal
  approveAnimal: (animalId: string, message: string = '') => {
    return api.put(`/admin/animals/${animalId}/approve`, { message });
  },

  // Reject animal
  rejectAnimal: (animalId: string, message: string = '') => {
    return api.put(`/admin/animals/${animalId}/reject`, { message });
  },

  // Bulk approve animals
  bulkApproveAnimals: (animalIds: string[], message: string = '') => {
    return api.put('/admin/animals/bulk-approve', { animalIds, message });
  },

  // Bulk reject animals
  bulkRejectAnimals: (animalIds: string[], message: string = '') => {
    return api.put('/admin/animals/bulk-reject', { animalIds, message });
  }
};

