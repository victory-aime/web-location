'use client'
import { globalState } from './config/globalState'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import LoaderWrapper from '../components/custom/loader/LoaderWrapper'
import { Toaster } from '_components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ThemeProvider } from '_components/ui/provider'

const createFallbackStore = () => configureStore({ reducer: {} })

export const GlobalApplication = ({ children, session }: { children: React.ReactNode, session:Session }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={globalState.getStore() ?? createFallbackStore()}>
        <ThemeProvider>
          <Toaster />
          <LoaderWrapper>{children}</LoaderWrapper>
        </ThemeProvider>
      </Provider>
    </SessionProvider>

  )
}
