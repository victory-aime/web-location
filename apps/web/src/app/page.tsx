'use client'

import { Box, Spinner, Text } from '@chakra-ui/react'
import { ProductModule } from 'bvg-innovation-state-management'
import { useState } from 'react'
import { BaseButton } from '_components/custom'

export default function ProductsPage() {
  const [enabled, setEnabled] = useState(false)
  const { data, isLoading, isError, error } = ProductModule.getPublicProductQueries({
    payload: {
      minPrice: 50,
    },
    queryOptions: { staleTime: 1000 * 60 * 5, enabled: enabled },
  })

  if (isLoading) {
    return (
      <Box color={'white'} bgColor={'red.400'}>
        <Spinner color={'blue'} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box color={'white'} bgColor={'red.400'}>
        <Text>{error?.toString()}</Text>
      </Box>
    )
  }

  return (
    <Box color={'white'} bgColor={'red.400'}>
      <Text>{JSON.stringify(data, null, 2)} dada</Text>
      <BaseButton onClick={() => setEnabled(!enabled)}>Refrech datat</BaseButton>
    </Box>
  )
}
