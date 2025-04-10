'use server';

import { getServerSession } from 'next-auth';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { authOptions } from '_/app/api/auth/[...nextauth]/route';
import { Footer } from '_/app/components/Footer';
import Header from '_app/components/Header';

export default async function WithHeaderLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <Box>
      <Header session={session} />
      {children}
      <Footer />
    </Box>
  );
}
