import {
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

type UseCustomQueryProps<TParams, TData, TError = AxiosError> = {
  queryKey: QueryKey
  queryFn: () => Promise<TData>
  payload?: TParams
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}
type UseCustomMutationProps<TPayload, TResult> = {
  mutationKey: QueryKey
  mutationFn: (payload: TPayload) => Promise<TResult>
  options?: Omit<UseMutationOptions<TResult, AxiosError, TPayload>, 'mutationKey' | 'mutationFn'>
}

export const useCustomQuery = <TParams, TData, TError = AxiosError>({
  queryKey,
  queryFn,
  options,
}: UseCustomQueryProps<TParams, TData, TError>) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const useCustomMutation = <TPayload, TResult>({
  mutationKey,
  mutationFn,
  options,
}: UseCustomMutationProps<TPayload, TResult>) => {
  return useMutation<TResult, AxiosError, TPayload>({
    mutationKey,
    mutationFn,
    ...options,
  })
}
