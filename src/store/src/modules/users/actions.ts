import * as Constants from "./constants";
import { TYPES } from "_store/src";

export const userInfoRequestAction = (userId: { userId: string }) => ({
  type: Constants.USER_INFO_REQUEST,
  payload: userId,
});

export const updateUserRequestInfo = (payload: TYPES.MODELS.USERS.IUser) => ({
  type: Constants.UPDATE_USER_REQUEST,
  payload,
});
