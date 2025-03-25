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

export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  store?: IStore;
}

export interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}
