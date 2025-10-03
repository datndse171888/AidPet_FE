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
