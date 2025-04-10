import { Bricolage_Grotesque } from 'next/font/google';
import AppMainEntry from './app';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

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
        <AppMainEntry session={session}>{children}</AppMainEntry>
      </body>
    </html>
  );
}
