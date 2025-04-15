'use client'
import { globalState } from './config/globalState'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import LoaderWrapper from '../components/custom/loader/LoaderWrapper'
import { Toaster } from '_components/ui/toaster'

const createFallbackStore = () => configureStore({ reducer: {} })

export const GlobalApplication = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={globalState.getStore() ?? createFallbackStore()}>
      <Toaster />
      <LoaderWrapper>{children}</LoaderWrapper>
    </Provider>
  )
}
