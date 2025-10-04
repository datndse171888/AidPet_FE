export interface AdoptionRequest {
    userId: string;
}

export interface AdoptionResponse {
    adoptionId: string;
    userId: string;
    applicationDate: string;
    status: 'CANCEL' | 'APPROVE' | 'REJECT' | 'PENDING';
    approvalDate: string;
}