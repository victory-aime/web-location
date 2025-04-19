// 'use client'
//
// import { Box, Spinner, Text } from '@chakra-ui/react'
// import { ProductModule } from 'bvg-innovation-state-management'
// import { useState } from 'react'
// import { BaseButton } from '_components/custom'
// import { useQueryClient } from '@tanstack/react-query'
//
// export default function ProductsPage() {
//   const [enabled, setEnabled] = useState(false)
//   const { data, isLoading, isError, error } = ProductModule.getPublicProductQueries({
//     payload: {},
//     queryOptions: { staleTime: 1000 * 60 * 5, enabled: enabled },
//   })
//
//   if (isLoading) {
//     return (
//       <Box color={'white'} bgColor={'red.400'}>
//         <Spinner color={'blue'} />
//       </Box>
//     )
//   }
//
//   if (isError) {
//     return (
//       <Box color={'white'} bgColor={'red.400'}>
//         <Text>{error?.toString()}</Text>
//       </Box>
//     )
//   }
//
//   const queryClient = useQueryClient()
//
//   const cachedData = queryClient.getQueryData(['ALL_PUBLIC_PRODUCTS'])
//
//   console.log('cache', cachedData)
//
//   return (
//     <Box color={'white'} bgColor={'red.400'}>
//       <Text>{JSON.stringify(data, null, 2)} dada</Text>
//       <BaseButton onClick={() => setEnabled(!enabled)}>Refrech datat</BaseButton>
//     </Box>
//   )
// }

import { PublicProductList } from './pages/public/products/components/PublicProduct'

export default function Home() {
  return <PublicProductList />
}
