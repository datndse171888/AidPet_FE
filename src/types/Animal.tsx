import { CategoryAnimal } from "./Category";
import { Shelter } from "./Shelter";

type status = 'AVAILABLE' | 'ADOPTED' | 'RESCUED' | 'PENDING' | 'REJECT';

export interface Animal {
    animalUuid: string;
    shelter?: Shelter;
    category_animals?: CategoryAnimal;
    name: string;
    age: number;
    breed: string;
    gender: string;
    description: string;
    imgUrl: string;
    status: status;
}

export interface AnimalRequest {
    shelterUuid: string;
    categoryAnimalsUuid: string;
    name: string;
    age: number;
    breed: string;
    gender: string;
    description: string;
    img_url: string;
}

export interface AnimalResponse {
    animalUuid: string;
    shelter: Shelter;
    categoryAnimals: CategoryAnimal;
    name: string;
    age: number;
    breed: string;
    gender: string;
    description: string;
    imgUrl: string;
    status: status;
    message: string;
}

export interface AnimalUpdateRequest {
    shelterUuid: string;
    categoryAnimalsUuid: string;
    name: string;
    age: number;
    breed: string;
    gender: string;
    description: string;
    img_url: string;
    status: status;
}

export interface AnimalUpdateResponse {
    animal_uuid: string;
    name: string;
    age: number;
    breed: string;
    gender: string;
    description: string;
    img_url: string;
    status: status;
    category_animals: CategoryAnimal;
    shelter: Shelter;
}

export interface AnimalUpdateStatusRequest {
    status: status;
    message: string;
}