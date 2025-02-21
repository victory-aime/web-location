export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IStore {
  id?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  image?: null;
  ownerId?: string | null | undefined;
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
  createdAt?: string;
  address?: string;
  status?: Status;
  password?: string;
  confirmPassword?: string;
  store?: IStore;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthState {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLogout: boolean;
  error: string | null;
}

export type AuthPayload = {
  user: User | null;
};

export interface ISendOtpResponse {
  message?: string;
  renewOtp?: number;
  expireAt?: string;
}
