import * as Constants from './constants';
import { TYPES } from '_store/src';

export const authLoginRequestAction = (
  payload: TYPES.MODELS.AUTH.AuthRequest,
) => ({
  type: Constants.AUTH_LOGIN_REQUEST,
  payload,
});

export const authLogoutRequestAction = () => ({
  type: Constants.AUTH_LOGOUT_REQUEST,
});

export const sendOtpChallengeRequestAction = (email: { email: string }) => ({
  type: Constants.SEND_OTP_REQUEST,
  payload: email,
});

export const validateOtpChallengeRequestAction = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => ({
  type: Constants.VALIDATE_OTP_REQUEST,
  payload: { email, code },
});

export const clearOtpChallengeAction = () => ({
  type: Constants.CLEAR_OTP_CHALLENGE,
});

export const resetPasswordRequestAction = ({
  email,
  password,
  oldPassword,
}: {
  email: string;
  password: string;
  oldPassword?: string;
}) => ({
  type: Constants.UPDATE_PASSWORD_REQUEST,
  payload: { email, password, oldPassword },
});

export const startOnboarding = () => ({
  type: Constants.START_ONBOARDING_PROCESS,
});

export const submitOnboardingProcess = (
  payload: TYPES.MODELS.AUTH.AuthOnboardingSubmitPayload,
) => ({
  type: Constants.SUBMIT_ONBOARDING_PROCESS,
  payload,
});

export const setUserDataAction = (payload: TYPES.MODELS.AUTH.User) => ({
  type: Constants.SET_DATA_USER,
  payload,
});

export const setSchoolUserDataAction = (
  payload: TYPES.MODELS.AUTH.ISchool,
) => ({
  type: Constants.SET_DATA_SCHOOL,
  payload,
});

export const clearSetUserSchoolData = () => ({
  type: Constants.RESET_SET_DATA_SCHOOL,
});

export const clearSetUserData = () => ({
  type: Constants.RESET_SET_DATA_USER,
});

export const clearOnboardingProcess = () => ({
  type: Constants.CLEAR_ONBOARDING_PROCESS,
});

export const authClearSessionAction = () => ({
  type: Constants.AUTH_CLEAR_SESSION,
});
