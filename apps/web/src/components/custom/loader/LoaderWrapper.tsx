import React from 'react'
import { useSelector } from 'react-redux'
import { CommonModule } from '@shop/shop-state-management'
import { Loader } from './Loader'

export const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useSelector(CommonModule.selectors.commonSelector)
  return (
    <>
      <Loader show={isLoading} />
      {children}
    </>
  )
}

export default LoaderWrapper
