import * as Constants from './constants'
const initialState = {
  showLoader: false,
}
export const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      }
    case Constants.HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      }
    default:
      return state
  }
}
//# sourceMappingURL=reducer.js.map
