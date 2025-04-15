import * as Constants from './constants'
import { RootState } from '../../main/rootState'

export const productSelector = (state: RootState) => state[Constants.PRODUCT_KEY_IN_STORE]
