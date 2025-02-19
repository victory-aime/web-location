"use client";

import {
  Box,
  Flex,
  For,
  HStack,
  IconButton,
  Link,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { FunctionComponent, useMemo, useState } from "react";

import Container from "./container";
import Header from "./header";
import { layoutStyle } from "./layout.styles";
import Sidebar from "./sidebar";
import { Footer } from "_app/layout/footer";

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      <Sidebar sideToggled={isSidebarOpen} onShowSidebar={toggleSidebar} />
      <Box {...toggledLayoutStyle}>
        <Header showSidebarButton onShowSidebar={toggleSidebar} />
        <Container>{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
