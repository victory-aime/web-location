import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'bvg-innovation-shared'
import { AxiosError } from 'axios'

export const userInfoQueries = (args: TYPES.QUERY_PAYLOAD.QueryPayload<string, any>) => {
  const { payload, queryOptions } = args
  return TYPES.FUNCTIONS.useCustomQuery<string, AxiosError>({
    queryKey: [Constants.WOHAMI, args.payload],
    queryFn: () => usersServiceInstance().whoAmI(payload),
    options: queryOptions,
  })
}

export const updateUserInfoQueries = (
  args: TYPES.QUERY_PAYLOAD.MutationPayload<TYPES.MODELS.USERS.IUpdateUserInfoPayload>
) => {
  return TYPES.FUNCTIONS.useCustomMutation<TYPES.MODELS.USERS.IUpdateUserInfoPayload, AxiosError>({
    mutationKey: [Constants.UPDATE_USER_INFO],
    mutationFn: (payload: TYPES.MODELS.USERS.IUpdateUserInfoPayload) =>
      usersServiceInstance().updateUserInfo(payload),
    ...args,
  })
}
