'use client'

import { Button } from '@chakra-ui/react'
import { ProductModule } from '@shop/shop-state-management'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { handleApiError } from '../utils/handleApiError'

export default function Home() {
  const dispatch = useDispatch()
  const { publicProducts } = useSelector(ProductModule.selectors.productSelector)

  useEffect(() => {
    dispatch(
      ProductModule.actions.getAllProductsRequestAction({
        storeId: '1',
      })
    )
  }, [])

  return (
    <div>
      <Button
        padding="4"
        variant="solid"
        bgColor={'red.500'}
        onClick={() => {
          handleApiError({
            status: 403,
            message: 'This is a custom toast notification',
          })
        }}
      >
        show toast
      </Button>
    </div>
  )
}
