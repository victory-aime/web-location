'use client'

import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export default function Layout({ children, session }: { children: ReactNode; session: Session }) {
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  )
}
