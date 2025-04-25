'use client'
import { Box, Flex, useBreakpointValue, VStack } from '@chakra-ui/react'
import { VariablesColors } from '_theme/variables'
import { LogOutIcon } from '_assets/svg'
import { BaseButton, SwitchColorMode } from '_components/custom'
import { signOut } from 'next-auth/react'
import { keycloakSessionLogOut } from '_hooks/logout'
import { MobileSidebar } from './components/MobileSidebar'
import { RenderLinks } from './components/RenderLinks'
import useSideBarStyle from './hooks/useSidebarStyle'
import { adminMenu } from './route/routes'
import { SideBarProps } from './types'
import { useState } from 'react'
import { CiShop } from 'react-icons/ci'

export const Sidebar = ({ sideToggled, onShowSidebar }: SideBarProps) => {
  const { toggledSideBarStyle } = useSideBarStyle({
    sideToggled,
  })
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [loader, setLoader] = useState(false)

  const handleLogout = () => {
    keycloakSessionLogOut().then(() => signOut({ callbackUrl: process.env.NEXTAUTH_URL }).then(() => setLoader(false)))
    setLoader(true)
  }

  return (
    <>
      {isMobile ? (
        <MobileSidebar isOpen={sideToggled} onClose={onShowSidebar} handleLogout={handleLogout} />
      ) : (
        <Box {...toggledSideBarStyle} className="sidebar">
          <Box display="flex" alignItems="center" justifyContent="center" onClick={onShowSidebar} mt={sideToggled ? 0 : 30} cursor="pointer">
            {sideToggled ? (
              <Flex width={'full'} minH={'100px'} alignItems={'center'} justifyContent={'center'}>
                <CiShop color={'white'} size={80} />
              </Flex>
            ) : (
              <CiShop color={'white'} size={40} />
            )}
          </Box>
          <VStack align="stretch" height="65%" overflow="auto">
            <RenderLinks links={adminMenu} sideToggled={sideToggled} onShowSidebar={onShowSidebar} />
          </VStack>

          <Box pe={'10px'} ps={'10px'}>
            <SwitchColorMode />
            <BaseButton
              width={'full'}
              withGradient
              mt={8}
              colorType={'danger'}
              overflow={'hidden'}
              justifyContent={'center'}
              onClick={handleLogout}
              isLoading={loader}
              leftIcon={<LogOutIcon width="18px" height="18px" fill={VariablesColors.white} />}
            >
              {sideToggled ? 'Deconnexion' : null}
            </BaseButton>
          </Box>
        </Box>
      )}
    </>
  )
}
