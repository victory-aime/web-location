'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '_config/globalState'
import React from 'react'
import { Toaster } from '_components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ThemeProvider } from '_components/ui/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionErrorModal } from '_components/custom/modal/ErrorModal'

const queryClient = new QueryClient()

export const GlobalApplication = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SessionErrorModal session={session} />
          <Toaster />
          {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </SessionProvider>
  )
}
