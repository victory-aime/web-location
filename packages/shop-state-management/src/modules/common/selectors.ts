import * as Constants from './constants'
import { RootState } from '../../main/rootState'

export const commonSelector = (state: RootState) => state[Constants.COMMON_KEY_IN_STORE]
