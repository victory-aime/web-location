import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { GlobalApplication } from './App'
import { authOptions } from '_authOptions/auth/[...nextauth]/route'
import React from 'react'
import { getServerSession } from 'next-auth'
import Layout from './layout/Layout'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'Shop',
  description: 'a web application for buy item online',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html className={bricolage.variable} suppressHydrationWarning>
      <body>
        <GlobalApplication session={session}>
          <Layout session={session}>{children}</Layout>
        </GlobalApplication>
      </body>
    </html>
  )
}
