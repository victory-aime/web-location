import * as Constants from './constants'
const initialState = {
  isLoading: false,
  showInfoModal: false,
  showSuccessModal: false,
  infoModalMessage: '',
  successModalMessage: '',
}
export const CommonReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case Constants.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      }
    case Constants.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      }
    case Constants.SHOW_INFO_MODAL:
      return {
        ...state,
        showInfoModal: true,
        infoModalMessage: action.payload,
      }
    case Constants.HIDE_INFO_MODAL:
      return {
        ...state,
        showInfoModal: false,
      }
    case Constants.SHOW_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: true,
        successModalMessage: action.payload,
      }
    case Constants.HIDE_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: false,
      }
    default:
      return state
  }
}
//# sourceMappingURL=reducer.js.map
