export interface Animal {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Fish';
  breed: string;
  age: number;
  size: 'Small' | 'Medium' | 'Large';
  price: number;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
}

export interface CartItem {
  animal: Animal;
  quantity: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface FormErrors {
  [key: string]: string;
}