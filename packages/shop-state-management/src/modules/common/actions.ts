import * as Constants from './constants'

export const showLoaderAction = () => ({
  type: Constants.SHOW_LOADER,
})
export const hideLoaderAction = () => ({
  type: Constants.HIDE_LOADER,
})

export const commonShowInfoModalAction = (payload: any) => ({
  type: Constants.SHOW_INFO_MODAL,
  payload,
})

export const commonHideInfoModalAction = (payload: any) => ({
  type: Constants.HIDE_INFO_MODAL,
  payload,
})

export const commonShowSuccessModalAction = (payload: any) => ({
  type: Constants.SHOW_SUCCESS_MODAL,
  payload,
})

export const commonHideSuccessModalAction = (payload: any) => ({
  type: Constants.HIDE_SUCCESS_MODAL,
  payload,
})
