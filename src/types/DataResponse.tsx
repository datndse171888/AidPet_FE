export interface DataResponse<T> {
    data: T[];
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}