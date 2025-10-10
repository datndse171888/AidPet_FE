export interface DataResponse<T> {
    listData: T[];
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}