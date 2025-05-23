'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import UserInfo from './UserInfo'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import { useSession } from 'next-auth/react'
import MyOrder from './MyOrder'
import Favourite from './Favourite'

const ManageUserProfile = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const { data: session } = useSession()
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Profile session={session} />
      case 1:
        return <MyOrder session={session} />
      case 2:
        return <Favourite session={session} />
      case 3:
        return <Settings />
      default:
        return <Profile session={session} />
    }
  }

  return (
    <Flex
      gap={{ base: '10px', lg: '20px' }}
      marginTop={'30px'}
      p={{ base: 5, md: 10 }}
      flexDir={{ base: 'column', lg: 'row' }}
    >
      <UserInfo currentStep={currentStep} onChangeStep={setCurrentStep} />
      <Box width={'100%'}>{renderStep()}</Box>
    </Flex>
  )
}

export default ManageUserProfile
