'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { Footer } from '_/app/components/Footer';
import Header from '_app/components/Header';

export default function PagesClientLayout({
                                            children,
                                            session,
                                          }: {
  children: ReactNode;
  session: Session;
}) {
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
