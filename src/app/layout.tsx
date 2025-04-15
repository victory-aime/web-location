import { Bricolage_Grotesque } from 'next/font/google';
import AppMainEntry from './app';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import PagesClientLayout from '_app/layout-container/protected/PagesClientLayout';
import React from 'react';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html className={bricolage.variable} lang="en" suppressHydrationWarning>
      <body>
        <AppMainEntry session={session}>
          <PagesClientLayout session={session}>{children}</PagesClientLayout>
        </AppMainEntry>
      </body>
    </html>
  );
}
