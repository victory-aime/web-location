import * as Constants from "./constants";

export const getAllProductsRequestAction = (storeId: { storeId: string }) => ({
  type: Constants.GET_PRODUCTS,
  payload: storeId,
});
