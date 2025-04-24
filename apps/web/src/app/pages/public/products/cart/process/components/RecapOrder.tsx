import { Box, Flex, For, Separator, VStack } from '@chakra-ui/react'
import { BaseText, TextVariant, TextWeight } from '_components/custom/base-text'
import { useCart } from '_hooks/cart'
import React, { useEffect } from 'react'
import CustomFormatNumber from '_components/custom/format-number/CustomFormatNumber'
import { BaseButton } from '_components/custom/button'
import { ImageRatio } from '_components/custom/aspect-ratio'

const RecapOrder = ({ cart, Previous, sendOrder }: { Previous: any; cart: any[]; sendOrder: () => void }) => {
  const { setCart, fetchCartFromStorage, triggerRefresh } = useCart()

  useEffect(() => {
    if (cart?.length === 0) {
      fetchCartFromStorage().then((data) => setCart(data))
    }
  }, [triggerRefresh])

  return (
    <Box>
      <Box>
        <For each={cart}>
          {(item, index) => (
            <Box key={index} width={'full'} mt={6}>
              <Flex gap={5} alignItems={'flex-start'} justifyContent={'flex-start'} width={'full'}>
                <Box width={'200px'}>
                  <ImageRatio image={item?.images[0]} />
                </Box>

                <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
                  <BaseText flexWrap={'wrap'} variant={TextVariant.M}>
                    {item?.name}
                  </BaseText>
                  <BaseText variant={TextVariant.M} fontWeight={TextWeight.Regular}>
                    <CustomFormatNumber value={item?.price} />
                  </BaseText>
                </VStack>
              </Flex>
              {cart?.length > 2 && <Separator mt={3} mb={3} />}
            </Box>
          )}
        </For>
      </Box>
      <Box mt={4}>
        <BaseText>Address de Livraison</BaseText>
        <VStack alignItems={'flex-start'} justifyContent={'flex-start'} mt={5}>
          <BaseText>Address Name</BaseText>
          <BaseText>Address desc</BaseText>
        </VStack>
      </Box>
      <Flex width={'full'} justifyContent={'center'} gap={5}>
        <Previous>
          <BaseButton bg={'gray'}>Revenir</BaseButton>
        </Previous>
        <BaseButton colorType={'secondary'} onClick={sendOrder}>
          Commander
        </BaseButton>
      </Flex>
    </Box>
  )
}

export default RecapOrder
