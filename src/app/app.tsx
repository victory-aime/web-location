'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '_store/store';
import React, { FC } from 'react';
import { Toaster } from '_components/ui/toaster';
import { ColorModeProvider } from '_/components/ui/color-mode';
import { CustomChakraProvider } from '_/components/ui/provider';
import { SessionProviderProps, SessionProvider } from 'next-auth/react';
import LoaderWrapper from '_/components/custom/loader/LoaderWrapper';

const AppMainEntry: FC<SessionProviderProps> = ({ children, session }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={session}>
        <CustomChakraProvider>
          <ColorModeProvider>
            <Toaster />
            <LoaderWrapper>{children}</LoaderWrapper>
          </ColorModeProvider>
        </CustomChakraProvider>
      </SessionProvider>
    </PersistGate>
  </Provider>
);

export default AppMainEntry;
