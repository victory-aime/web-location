'use client'
import { Box, Flex, useBreakpointValue, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BoxContainer, CustomSkeletonLoader } from '_components/custom'
import { UsersModule } from 'bvg-innovation-state-management'
import { BaseButton } from '_components/custom/button'
import { ThinkingLottieAnimation } from '_lottie/animations/LottieAnimation'
import { BaseText } from '_components/custom/base-text/BaseText'
import { TextVariant } from '_components/custom/base-text'
import ThinkBoxModal from './ThinkBoxModal'
import { ListOrders } from './ListOrder'
import { RecentOrders } from './RecentOrders'

export const Dashboard = () => {
  const cachedUser = UsersModule.UserCache.getUser()
  const [openTinhBox, setOpenTinhBox] = useState(false)
  const [pendingUser, setPendingUser] = useState(false)
  const responsiveMode = useBreakpointValue({ base: false, lg: true })

  useEffect(() => {
    if (!cachedUser) {
      setPendingUser(true)
    }
  }, [cachedUser])

  return (
    <BoxContainer
      loader={pendingUser}
      numberOfLines={2}
      border={'none'}
      title={'Dashboard'}
      description={`Welcome back to your dashboard Admin Mr/Mrs. ${cachedUser?.name + ' ' + cachedUser?.firstName}`}
    >
      {/* <Flex gap={8} width={'full'} mt={50} overflowX={'auto'}>
        <For each={statData}>{(item, index) => <ReviewStats key={index} {...item} />}</For>
      </Flex> */}
      {pendingUser ? (
        <VStack gap={4} width={'full'} mt={'30px'} overflowX={'auto'}>
          <CustomSkeletonLoader type="TEXT_IMAGE" width={responsiveMode ? '50%' : '100%'} height={'200px'} numberOfLines={5} direction={'column'} />
          <CustomSkeletonLoader type={'BUTTON'} width={'200px'} colorButton={'success'} />
        </VStack>
      ) : (
        <VStack gap={8} width={'full'} mt={'30px'} overflowX={'auto'}>
          <Box width={'250px'}>
            <ThinkingLottieAnimation />
          </Box>
          <VStack gap={5} width={{ base: 'full', lg: '1/2' }}>
            <BaseText variant={TextVariant.M} textAlign={'center'}>
              Pour ameliorer votre experience, nous vous invitons à nous faire part de vos suggestions et de vos commentaires. Nous sommes impatients de vous entendre et de travailler ensemble pour
              rendre notre application encore meilleure !<br />
              Appuyer sur ce bouton pour nous faire part de vos suggestions.
            </BaseText>
            <BaseButton withGradient colorType={'success'} onClick={() => setOpenTinhBox(true)}>
              J'ai une idee
            </BaseButton>
          </VStack>
        </VStack>
      )}

      <Flex gap={8} width={'full'} mt={'30px'} flexDir={{ base: 'column', md: 'row' }} overflowX={'auto'}>
        {/* <WeeklyDepenses /> */}
        <RecentOrders />
        {/* <ListOrders /> */}
      </Flex>

      {/* <Flex
        width={'full'}
        h={'100%'}
        gap={8}
        mt={'30px'}
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
      >
        <Flex width={'100%'}>
          <RecentOrders />
        </Flex>
        <Flex width={{ base: '100%', md: '1/3' }}>
          <MonthlyIncomes />
        </Flex>
      </Flex> */}
      {/* <Flex
        gap={8}
        width={{ base: '100%', md: 'full' }}
        flexDir={{ base: 'column', md: 'row' }}
        overflowX={'auto'}
      >
        <TopProducts />
        <TopCategory />
      </Flex> */}
      <ThinkBoxModal isOpen={openTinhBox} onChange={() => setOpenTinhBox(false)} />
    </BoxContainer>
  )
}
