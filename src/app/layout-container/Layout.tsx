'use client';

import { Box } from '@chakra-ui/react';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Container from './container';
import Header from './header';
import { layoutStyle } from './layout.styles';
import Sidebar from './sidebar';
import { Session } from 'next-auth';
import { decrypt } from '_utils/encrypt';
import { useDispatch } from 'react-redux';
import { AuthModule } from '_store/src/modules';
import { SessionErrorModal } from '_components/custom/modal';

const Layout: FunctionComponent<{
  children: React.ReactNode;
  session: Session;
}> = ({ children, session }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggledLayoutStyle = useMemo(
    () => ({
      ...layoutStyle,
      ml: {
        md: isSidebarOpen ? '220px' : '80px',
        lg: isSidebarOpen ? '230px' : '70px',
      },
      width: {
        md: isSidebarOpen ? 'calc(100% - 220px)' : 'calc(100% - 80px)',
        lg: isSidebarOpen ? 'calc(100% - 230px)' : 'calc(100% - 70px)',
      },
    }),
    [isSidebarOpen]
  );

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      const decodeToken = decrypt(session.access_token);
      const decodeRefreshToken = decrypt(session.refresh_token);
      dispatch(AuthModule.actions.setTokenKeys(decodeToken, decodeRefreshToken));
    }
  }, [session]);

  return (
    <>
      <Sidebar sideToggled={isSidebarOpen} onShowSidebar={toggleSidebar} session={session} />
      <Box {...toggledLayoutStyle}>
        <Header sideToggled={false} onShowSidebar={toggleSidebar} session={session} />
        <Container>{children}</Container>
      </Box>
      <SessionErrorModal session={session} />
    </>
  );
};
export default Layout;
