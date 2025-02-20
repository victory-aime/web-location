import * as Constants from "./constants";

interface Props {
  showLoader: boolean;
}

const initialState: Props = {
  showLoader: false,
};

const LoaderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Constants.SHOW_LOADER:
      return {
        ...state,
        showLoader: true,
      };
    case Constants.HIDE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    default:
      return state;
  }
};

export default LoaderReducer;
