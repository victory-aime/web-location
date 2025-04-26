import { Box } from '@chakra-ui/react'
import React from 'react'
import { WishlistModule } from 'bvg-innovation-state-management'
import { Session } from 'next-auth'
import { BoxContainer, CustomSkeletonLoader } from '_components/custom'
import CustomProductList from '../../../public/products/components/CustomProductList'
import { useQueryClient } from '@tanstack/react-query'

const Favourite = ({ session }: { session: Session | null }) => {
  const queryClient = useQueryClient()
  const { data: wishlist, isLoading } = WishlistModule.getUserWishlistQueries({
    payload: {
      userId: session?.keycloakId,
    },
  })
  const { mutateAsync } = WishlistModule.removeWishlistItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WishlistModule.constants.USERS_WISHLIST] })
    },
  })

  const deleteItem = async (item: string) => {
    await mutateAsync({
      userId: session?.keycloakId,
      productId: item,
    })
  }

  return (
    <BoxContainer border={'none'} p={{ base: 5, md: 10 }}>
      {isLoading ? (
        <Box width={'full'} height={'full'}>
          <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
        </Box>
      ) : (
        <CustomProductList
          products={wishlist?.content?.map((item) => item?.product) ?? []}
          initialPage={1}
          totalItems={5}
          pageSize={5}
          hidePagination
          showDeleteButton
          onDeleteButton={deleteItem}
          lazy
        />
      )}
    </BoxContainer>
  )
}

export default Favourite
