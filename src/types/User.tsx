import { Adoption } from "./Adoption";
import { Order } from "./Order";
import { Shelter } from "./Shelter";
import { Sponsor } from "./Sponsor";

export interface LoginFormData {
  userName: string;
  password: string;
}

export interface RegisterFormData {
  userName: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  address: string;
  role: 'USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER';
  gender: boolean;
  imgUrl?: string;
}

export interface AccountResponse {
  uuid: string,
  userName: string,
  fullName: string,
  phone: string,
  email: string,
  address: string,
  role: 'USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER',
  token: string,
  image: string
}

export interface VerifyTokenRequest {
  token: string;
}

export interface Account {
  userUuid: string;
  userName: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  gender: boolean;
  address: string;
  imgUrl: string;
  role: 'USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER';
  isDeleted: boolean;
  adoptionList: Adoption[];
  orderList: Order[];
  sponsors: Sponsor[];
  shelter: Shelter;
  createdAt: string;
  enabled: boolean;
}