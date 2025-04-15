import * as Constants from './constants'
export const showLoaderAction = () => ({
  type: Constants.SHOW_LOADER,
})
export const hideLoaderAction = () => ({
  type: Constants.HIDE_LOADER,
})
export const commonShowInfoModalAction = (payload) => ({
  type: Constants.SHOW_INFO_MODAL,
  payload,
})
export const commonHideInfoModalAction = (payload) => ({
  type: Constants.HIDE_INFO_MODAL,
  payload,
})
export const commonShowSuccessModalAction = (payload) => ({
  type: Constants.SHOW_SUCCESS_MODAL,
  payload,
})
export const commonHideSuccessModalAction = (payload) => ({
  type: Constants.HIDE_SUCCESS_MODAL,
  payload,
})
//# sourceMappingURL=actions.js.map
