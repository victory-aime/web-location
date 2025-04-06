export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IStore {
  id?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  image?: null;
  userId?: string | null | undefined;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  deletedAt?: null;
}

export interface User {
  id?: string;
  firstName?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  store?: IStore;
}

export interface AuthState {
  currentUser: User | null;
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}
