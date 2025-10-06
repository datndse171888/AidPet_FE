import { Animal } from "./Animal";
import { Product } from "./Product";

export interface Category {
    category_uuid: string;
    category_name: string;
    category_description: string;
    productList: Product[];
}

export interface CategoryAnimal {
    animalCateUuid: string;
    categoryName: string;
    description: string;
    animalList: Animal[];
}