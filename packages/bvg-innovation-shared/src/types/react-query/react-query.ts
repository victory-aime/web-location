import { QueryClient } from '@tanstack/react-query'
import { CacheHelper } from '../helper'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
    },
  },
})
CacheHelper.init(queryClient)
