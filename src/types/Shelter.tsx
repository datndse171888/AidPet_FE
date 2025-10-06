import { Adoption } from "./Adoption";
import { Animal } from "./Animal";
import { Account } from "./User";

export interface ShelterRequest {
    uuid: string,
    shelterName: string,
    address: string,
    phone: string,
    email: string,
    description: string,
}

export interface ShelterResponse {
    shelterUuid: string,
    shelterName: string,
    shelterAmount: number,
    address: string,
    phone: string,
    email: string,
    description: string
    adoption: Adoption;
    animalList: Animal[];
}

export interface Shelter {
    shelterUuid: string;
    shelterName: string;
    shelterAmount: number;
    address: string;
    phone: string;
    email: string;
    description: string;
    adoptions?: Adoption[];
    account: Account;
    animalList: Animal[];
}