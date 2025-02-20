"use client";

import { Box } from "@chakra-ui/react";
import React, { FunctionComponent, useMemo, useState } from "react";

import Container from "./container";
import Header from "./header";
import { layoutStyle } from "./layout.styles";
import Sidebar from "./sidebar";
import { Footer } from "_app/layout/footer";
import { useSelector } from "react-redux";
import { AuthModule } from "_/store/src/modules";

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggledLayoutStyle = useMemo(
    () =>
      isSidebarOpen
        ? layoutStyle
        : {
            ...layoutStyle,
            ms: { base: "", md: "250px", lg: "100px" },
            w: {
              base: "",
              md: "calc(100vw - 250px)",
              lg: "calc(100vw - 100px)",
            },
            h: "calc(100vh - 35px)",
          },
    [isSidebarOpen]
  );

  return (
    <Box>
      <Sidebar
        currentUser={currentUser ?? undefined}
        sideToggled={isSidebarOpen}
        onShowSidebar={toggleSidebar}
      />
      <Box {...toggledLayoutStyle}>
        <Header
          currentUser={currentUser ?? undefined}
          sideToggled={false}
          onShowSidebar={toggleSidebar}
        />
        <Container>{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
