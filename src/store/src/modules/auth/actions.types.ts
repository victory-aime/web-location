import * as Constants from "./constants";
import { TYPES } from "_store/src";

export interface LoginRequestAction {
  type: typeof Constants.AUTH_LOGIN_REQUEST;
  payload: TYPES.MODELS.AUTH.AuthRequest;
}

export interface LoginSuccessAction {
  type: typeof Constants.AUTH_LOGIN_SUCCESS;
  payload: TYPES.MODELS.AUTH.AuthPayload;
}

export interface LoginFailureAction {
  type: typeof Constants.AUTH_LOGIN_FAILURE;
  payload: string;
}

export interface SendOtpChallengeRequestAction {
  type: typeof Constants.SEND_OTP_REQUEST;
  payload: string;
}

export interface SendOtpChallengeSuccessAction {
  type: typeof Constants.SEND_OTP_SUCCESS;
  payload: TYPES.MODELS.AUTH.ISendOtpResponse;
}

export interface SendOtpChallengeFailureAction {
  type: typeof Constants.SEND_OTP_FAILURE;
  payload: string;
}

export interface ValidateOtpChallengeRequestAction {
  type: typeof Constants.VALIDATE_OTP_REQUEST;
  payload: string;
}

export interface ValidateOtpChallengeSuccessAction {
  type: typeof Constants.VALIDATE_OTP_SUCCESS;
}

export interface ValidateOtpChallengeFailureAction {
  type: typeof Constants.VALIDATE_OTP_FAILURE;
  payload: string;
}

export interface ClearOtpChallengeAction {
  type: typeof Constants.CLEAR_OTP_CHALLENGE;
}

export interface UpdatePasswordRequestAction {
  type: typeof Constants.UPDATE_PASSWORD_REQUEST;
  payload: string;
}

export interface UpdatePasswordSuccessAction {
  type: typeof Constants.UPDATE_PASSWORD_SUCCESS;
  payload: string;
}

export interface UpdatePasswordFailureAction {
  type: typeof Constants.UPDATE_PASSWORD_FAILURE;
  payload: string;
}

export interface StartOnboardingProcessAction {
  type: typeof Constants.START_ONBOARDING_PROCESS;
}

export interface SetDataUserAction {
  type: typeof Constants.SET_DATA_USER;
  payload: TYPES.MODELS.AUTH.User;
}

export interface ResetSetDataUserAction {
  type: typeof Constants.RESET_SET_DATA_USER;
}

export interface SetDataSchoolAction {
  type: typeof Constants.SET_DATA_SCHOOL;
  payload: TYPES.MODELS.AUTH.ISchool;
}

export interface ResetSetDataSchoolAction {
  type: typeof Constants.RESET_SET_DATA_SCHOOL;
}

export interface OnboardingProcessSuccessAction {
  type: typeof Constants.ONBOARDING_PROCESS_SUCCESS;
}

export interface SubmitOnboardingProcessAction {
  type: typeof Constants.SUBMIT_ONBOARDING_PROCESS;
  payload: TYPES.MODELS.AUTH.AuthOnboardingSubmitPayload;
}

export interface OnboardingProcessErrorAction {
  type: typeof Constants.ONBOARDING_PROCESS_ERROR;
  payload: string;
}

export interface ClearOnboardingProcessAction {
  type: typeof Constants.CLEAR_ONBOARDING_PROCESS;
}

export interface ClearSessionAction {
  type: typeof Constants.AUTH_CLEAR_SESSION;
}

export interface ClearSessionActionFaillure {
  type: typeof Constants.AUTH_CLEAR_SESSION_FAILURE;
  payload: string;
}

export interface LogoutRequestAction {
  type: typeof Constants.AUTH_LOGOUT_REQUEST;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | ClearSessionAction
  | LogoutRequestAction
  | SendOtpChallengeRequestAction
  | SendOtpChallengeSuccessAction
  | SendOtpChallengeFailureAction
  | ValidateOtpChallengeRequestAction
  | ValidateOtpChallengeSuccessAction
  | ValidateOtpChallengeFailureAction
  | UpdatePasswordRequestAction
  | UpdatePasswordSuccessAction
  | UpdatePasswordFailureAction
  | StartOnboardingProcessAction
  | SetDataUserAction
  | ResetSetDataUserAction
  | SetDataSchoolAction
  | ResetSetDataSchoolAction
  | OnboardingProcessSuccessAction
  | SubmitOnboardingProcessAction
  | OnboardingProcessErrorAction
  | ClearOnboardingProcessAction
  | ClearOtpChallengeAction
  | ClearSessionActionFaillure;
