export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
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
  startOnboarding: boolean;
  isSuccess: boolean;
  sendOtpChallenge: boolean;
  validateOtpChallenge: boolean;
  updatePassword: boolean;
  error: string | null;
}

export type AuthPayload = {
  currentUser: User | null;
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
