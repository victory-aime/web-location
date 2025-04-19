import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'bvg-innovation-shared'
import { AxiosError } from 'axios'

export const userInfoQueries = (
  args: TYPES.QUERY_PAYLOAD.QueryPayload<{ userId: string }, any>
) => {
  const { payload, queryOptions } = args
  return TYPES.FUNCTIONS.useCustomQuery<TYPES.MODELS.USERS.IUser, AxiosError>({
    queryKey: [Constants.WOHAMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload.userId }),
    options: queryOptions,
  })
}

export const updateUserInfoQueries = (
  args: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.USERS.IUpdateUserInfoPayload>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.USERS.IUpdateUserInfoPayload, AxiosError>({
    mutationKey: [Constants.UPDATE_USER_INFO],
    mutationFn: (payload) => usersServiceInstance().updateUserInfo(payload),
    options: args,
  })
}
