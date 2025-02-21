import * as Constants from "./constants";
import { TYPES } from "_store/src";

export const authLoginRequestAction = (
  payload: TYPES.MODELS.AUTH.AuthRequest
) => ({
  type: Constants.AUTH_LOGIN_REQUEST,
  payload,
});

export const authLogoutRequestAction = () => ({
  type: Constants.AUTH_LOGOUT_REQUEST,
});

export const authClearSessionAction = () => ({
  type: Constants.AUTH_CLEAR_SESSION,
});
