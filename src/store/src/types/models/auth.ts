export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ISchool {
  id?: string;
  name?: string;
  address?: string;
  status?: Status;
  city?: string;
  country?: string;
}

export interface IPermission {
  id: string;
  moduleId: string;
  canAccess: boolean;
  moduleName: string;
}

export interface IFeaturePermission {
  id: string;
  featureId: string;
  canExecute: boolean;
  featureName: string;
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
  birthDate?: string;
  roleType?: string;
  password?: string;
  confirmPassword?: string;
  schools?: ISchool[];
  schoolId?: string;
  store?: IStore;
  school?: Record<string, any>;
  permissions?: IPermission[];
  permissionsFeatures?: IFeaturePermission[];
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthState {
  currentUser: User | null;
  schoolInfo: ISchool | null;
  otpResponse: ISendOtpResponse | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLogout: boolean;
  startOnboarding: boolean;
  isSuccess: boolean;
  sendOtpChallenge: boolean;
  validateOtpChallenge: boolean;
  updatePassword: boolean;
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

export type AuthOnboardingSubmitPayload = {
  currentUser: User;
  schoolInfo: ISchool;
  packId?: string;
};
