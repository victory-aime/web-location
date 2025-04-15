import { TYPES } from '@shop/shop-shared'
import { AnyAction } from 'redux'
export declare const CommonReducer: (
  state?: TYPES.MODELS.COMMON.ICommonState,
  action?: AnyAction
) =>
  | {
      showInfoModal: boolean
      infoModalMessage: any
      isLoading: boolean
      showSuccessModal: boolean
      successModalMessage: string
    }
  | {
      showSuccessModal: boolean
      successModalMessage: any
      isLoading: boolean
      showInfoModal: boolean
      infoModalMessage: string
    }
//# sourceMappingURL=reducer.d.ts.map
