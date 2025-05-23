'use client'
import {
  Box,
  Circle,
  Flex,
  Float,
  FormatNumber,
  Heading,
  HStack,
  Image,
  Separator,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UTILS } from 'bvg-innovation-shared'
import { ProductModule, WishlistModule } from 'bvg-innovation-state-management'
import { CustomBadge } from '_components/custom/badge'
import { BaseButton } from '_components/custom/button'
import { BsHeart } from 'react-icons/bs'
import { StepperInput } from '_components/ui/stepper-input'
import { Avatar } from '_components/ui/avatar'
import CustomProductList from '../components/CustomProductList'
import { CustomToast, ToastStatus } from '_components/custom'
import { saveCartToStorage, useCart } from '_hooks/cart'
import { BaseText, TextVariant } from '_components/custom/base-text'
import { ImageRatio } from '_components/custom'
import { useSession } from 'next-auth/react'
import { IoIosHeart } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

const DetailsProducts = () => {
  const requestId = useSearchParams()?.get('requestId')
  const queryClient = useQueryClient()
  const { data: session, status } = useSession()
  const productListPayload = useMemo(
    () => ({
      productId: requestId ?? null,
      userId: session?.keycloakId,
    }),
    [requestId, session?.keycloakId]
  )

  const { data: publicProducts } = ProductModule.getPublicProductQueries({
    payload: productListPayload,
    queryOptions: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  })

  const { mutateAsync: addToWishlist } = WishlistModule.addWishlistItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductModule.constants.ALL_PUBLIC_PRODUCTS] })
    },
  })
  const { mutateAsync: removeFromWishlist } = WishlistModule.removeWishlistItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductModule.constants.ALL_PUBLIC_PRODUCTS] })
    },
  })

  const { cart, setCart, triggerRefresh, fetchCartFromStorage } = useCart()
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const findItem = UTILS.findDynamicIdInList(requestId ?? '', publicProducts?.content)

  const toggleWishlist = useCallback(() => {
    if (!session?.keycloakId || !findItem) return
    const payload = {
      userId: session.keycloakId,
      productId: findItem.id,
    }
    if (findItem.isInWishlist) {
      removeFromWishlist(payload)
    } else {
      addToWishlist(payload)
    }
  }, [session, findItem])

  const findSameCategoriesItem = publicProducts?.content?.filter(
    (value: any) => value.categoryName === findItem?.categoryName && value.id !== findItem?.id
  )

  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (requestId && findItem) {
      fetchCartFromStorage().then(setCart)
      setImages(findItem?.images)
      setSelectedImage(findItem.images?.[0] || null)
      const existingItem = cart?.find((item: any) => item.id === findItem.id)
      if (existingItem) {
        setQuantity(existingItem.quantity)
      } else {
        setQuantity(0)
      }
    }
  }, [requestId, findItem, triggerRefresh])

  const addItemToCart = () => {
    setLoading(true)
    setTimeout(() => {
      const existingItemIndex = cart?.findIndex((item: any) => item.id === findItem.id)
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1
      } else {
        cart.push({ ...findItem, quantity: 1 })
      }
      saveCartToStorage(cart)
      setQuantity((prev) => prev + 1)
      fetchCartFromStorage().then((r) => setCart(r))
      setLoading(false)
      CustomToast({
        description: 'Produit ajouter au panier',
        duration: 1000,
      })
    }, 1500)
  }

  const updateQuantity = (newQuantity: number) => {
    setLoading(true)
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItemIndex = cart.findIndex((item: any) => item.id === findItem.id)

      if (existingItemIndex !== -1) {
        if (newQuantity === 0) {
          cart.splice(existingItemIndex, 1)
        } else {
          cart[existingItemIndex].quantity = newQuantity
        }
        saveCartToStorage(cart)
        setQuantity(newQuantity)
        fetchCartFromStorage().then((r) => setCart(r))
        CustomToast({
          type: ToastStatus.INFO,
          description: 'Produit mis a jour',
          duration: 1000,
        })
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <>
      <Box p={5} width="full" mt={5}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          {/* Section Images */}
          <Box flex={1}>
            {/* Image principale sur PC */}

            <Flex width="100%" position={'relative'}>
              <ImageRatio image={selectedImage} display={{ base: 'none', md: 'block' }} />
              {status === 'authenticated' && (
                <Float placement={{ base: 'top-center', md: 'top-end' }} cursor={'pointer'} onClick={toggleWishlist}>
                  <Circle size="45px" bg="white" color="red">
                    {findItem?.isInWishlist ? <IoIosHeart /> : <BsHeart />}
                  </Circle>
                </Float>
              )}
            </Flex>

            {/* Miniatures sur PC */}
            <HStack gap={2} mt={3} display={{ base: 'none', md: 'flex' }}>
              {images?.map((img: string, index: number) => (
                <Image
                  key={index}
                  src={img}
                  boxSize="80px"
                  borderRadius="7px"
                  cursor="pointer"
                  border={selectedImage === img ? '2px solid #3182CE' : 'none'}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </HStack>

            {/* Affichage en défilement horizontal sur mobile */}
            <Flex overflowX="auto" gap={1} display={{ base: 'flex', md: 'none' }} width="100%" p={2}>
              {images?.map((img: string, index: number) => (
                <Image key={index} src={img} borderRadius="12px" width="100%" alt={'image-details'} />
              ))}
            </Flex>
          </Box>

          {/* Section Détails */}
          <Box flex={1} width={'full'} position={'relative'}>
            <Stack gap={3}>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Heading>{findItem?.name}</Heading>
                <CustomBadge type="product" status={findItem?.status} />
              </Flex>
              <Stack gap={2}>
                <Text fontWeight="bold" color="gray.600">
                  {findItem?.category}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Avis & Notes ici
                </Text>
                <FormatNumber notation="compact" value={findItem?.price} style="currency" currency="USD" />
              </Stack>
              <Text fontSize="md">{findItem?.description}</Text>
            </Stack>
            <Stack mt={8}>
              <Box>
                <Text>Color</Text>
                <Text>display item here</Text>
              </Box>
              <Box>
                <Text>Color</Text>
                <Text>display item here</Text>
              </Box>
            </Stack>
            <Flex width={'full'} mt={8} p={5} gap={5} alignItems={'center'} justifyContent={'center'}>
              {loading ? (
                <Spinner />
              ) : quantity > 0 ? (
                <StepperInput
                  defaultValue={quantity?.toString()}
                  min={1}
                  max={findItem?.stock}
                  disabled={loading}
                  onValueChange={(e) => updateQuantity(e.value as unknown as number)}
                />
              ) : (
                <BaseButton width={'full'} p={'25px'} withGradient colorType={'success'} onClick={addItemToCart}>
                  <BaseText variant={TextVariant.S}>Ajouter au panier</BaseText>
                </BaseButton>
              )}
            </Flex>
          </Box>
        </Flex>
        <Box mt={'50px'}>
          <Heading>Reviews</Heading>
          <Box mt={'20px'}>
            <Flex alignItems={'center'} gap={4}>
              <Avatar size={'2xl'} />
              <Stack gap={1}>
                <Text>username here</Text>
                <Text>star here</Text>
              </Stack>
            </Flex>
            <Stack gap={2} mt={4}>
              <Text>Title here</Text>
              <Text>Description here</Text>
              <Text>createdReview here</Text>
            </Stack>
            <Separator colorPalette={'gray'} mt={5} />
          </Box>
        </Box>
        <Box mt={'50px'}>
          <Heading>Related Products</Heading>
          <Box mt={'20px'} p={{ base: 2, lg: 5 }}>
            <CustomProductList
              products={findSameCategoriesItem as any}
              initialPage={1}
              pageSize={findSameCategoriesItem?.slice(0, 4).length ?? 0}
              hidePagination
              lazy={false}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DetailsProducts
