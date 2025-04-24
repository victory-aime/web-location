'use client'

import { Box } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Session } from 'next-auth'
import { decrypted } from '_utils/crypt'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { layoutStyle } from './styles'
import { globalApplicationContext } from '_config/globalState'
import { Container } from './container/Container'

export const Layout: FunctionComponent<{
  children: React.ReactNode
  session: Session
}> = ({ children, session }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const toggledLayoutStyle = useMemo(
    () => ({
      ...layoutStyle,
      ml: {
        md: isSidebarOpen ? '220px' : '80px',
        lg: isSidebarOpen ? '230px' : '70px',
      },
      width: {
        md: isSidebarOpen ? 'calc(100% - 220px)' : 'calc(100% - 80px)',
        lg: isSidebarOpen ? 'calc(100% - 230px)' : 'calc(100% - 70px)',
      },
    }),
    [isSidebarOpen]
  )

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      const decodeToken = decrypted(session.access_token)
      const decodeRefreshToken = decrypted(session.refresh_token)
      globalApplicationContext.setToken(decodeToken)
      globalApplicationContext.setRefreshToken(decodeRefreshToken)
    }
  }, [session])

  useEffect(() => {
    if (!session) {
      globalApplicationContext.setToken('')
      globalApplicationContext.setRefreshToken('')
    }
  }, [session])

  return (
    <>
      <Sidebar sideToggled={isSidebarOpen} onShowSidebar={toggleSidebar} session={session} />
      <Box {...toggledLayoutStyle}>
        <Header sideToggled={false} onShowSidebar={toggleSidebar} session={session} />
        <Container>{children}</Container>
      </Box>
    </>
  )
}
