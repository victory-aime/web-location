'use client'
import { Box, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BoxContainer } from '_components/custom'
import { UsersModule } from 'bvg-innovation-state-management'
import { BaseButton } from '_components/custom/button'
import { ThinkingLottieAnimation } from '_lottie/animations/LottieAnimation'
import { BaseText } from '_components/custom/base-text/BaseText'
import { TextVariant } from '_components/custom/base-text'
import ThinkBoxModal from './ThinkBoxModal'
import { ListOrders } from './ListOrder'
import { RecentOrders } from './RecentOrders'

export const Dashboard = () => {
  const cachedUser = UsersModule.cache.UserCache.getPrivate()
  const [openTinhBox, setOpenTinhBox] = useState(false)

  return (
    <BoxContainer border={'none'} title={'Dashboard'} description={`Welcome back to your dashboard Admin Mr/Mrs. ${cachedUser?.name + ' ' + cachedUser?.firstName}`}>
      {/* <Flex gap={8} width={'full'} mt={50} overflowX={'auto'}>
        <For each={statData}>{(item, index) => <ReviewStats key={index} {...item} />}</For>
      </Flex> */}
      <VStack gap={8} width={'full'} mt={'30px'} alignItems={'center'} justifyContent={'center'} overflowX={'auto'}>
        <Box width={'250px'}>
          <ThinkingLottieAnimation />
        </Box>
        <VStack gap={5} alignItems={'center'} justifyContent={'center'} width={{ base: 'full', lg: '1/2' }}>
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

      <Flex gap={8} width={'full'} mt={'30px'} flexDir={{ base: 'column', md: 'row' }} overflowX={'auto'}>
        {/* <WeeklyDepenses /> */}
        <RecentOrders />
        <ListOrders />
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
