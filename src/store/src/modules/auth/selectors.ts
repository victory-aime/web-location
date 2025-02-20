import * as Constant from './constants';
import { RootState } from '_store/rootReducer';

export const getAuthUserSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.currentUser;

export const getIsLoggedInSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoggedIn;

export const getAuthLoadingSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoading ?? false;

export const getUpdatePasswordSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.updatePassword;

export const getSendOtpChallengeSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.sendOtpChallenge;

export const getValidateOtpChallengeSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.validateOtpChallenge;

export const getUpdatePasswordFailureSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.updatePassword;

export const getAuthErrorSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.error;

export const startOnboardingSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.startOnboarding;

export const isLoading = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isLoading;

export const onboardingIsSuccess = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.isSuccess;

export const getSchoolInfoSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE]?.schoolInfo;

export const authSelector = (state: RootState) =>
  state[Constant.AUTH_KEY_IN_STORE];
