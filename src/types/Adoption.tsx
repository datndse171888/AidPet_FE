import { Animal } from "./Animal";
import { Shelter } from "./Shelter";
import { Account } from "./User";

type status = 'CANCEL' | 'APPROVE' | 'REJECT' | 'PENDING';

export interface AdoptionRequest {
    shelterUuid: string;
    userId: string;
    animalUuid: string;
    message: string;
}

export interface AdoptionResponse {
    shelterUuid: string;
    userId: string;
    applicationDate: string;
    status: status;
    approvalDate: string;
    animalUuid: string;
}


export interface AdoptionResponse {
    adoptionId: string;
    userId: string;
    applicationDate: string;
    status: status;
    approvalDate: string;
}

export interface Adoption {
    adoptionUuid: string;
    user?: Account,
    shelter?: Shelter,
    applicationDate: string;
    status: status;
    animal: Animal;
    approvalDate: string;
}

export interface AdoptionStatusUpdateRequest {
    status: status;
}