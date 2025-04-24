import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { GlobalApplication } from './App'
import { Layout } from './layout/Layout'
import { getServerSession } from 'next-auth'
import { authOptions } from '_authOptions/auth/[...nextauth]/route'

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Shop Dashboad',
  description: 'Simple dashboard for your app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <html className={`${lato.variable}`} suppressHydrationWarning>
        <body>
          <GlobalApplication session={session}>{children}</GlobalApplication>
        </body>
      </html>
    )
  }

  return (
    <html className={`${lato.variable}`} suppressHydrationWarning>
      <body>
        <GlobalApplication session={session}>
          <Layout session={session}>{children}</Layout>
        </GlobalApplication>
      </body>
    </html>
  )
}
