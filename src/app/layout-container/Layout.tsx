"use client";

import { Box } from "@chakra-ui/react";
import React, { FunctionComponent, useMemo, useState } from "react";

import Container from "./container";
import Header from "./header";
import { layoutStyle } from "./layout.styles";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { AuthModule } from "_/store/src/modules";

const Layout: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggledLayoutStyle = useMemo(
    () => ({
      ...layoutStyle,
      ml: {
        md: isSidebarOpen ? "220px" : "80px",
        lg: isSidebarOpen ? "230px" : "70px",
      },
      width: {
        md: isSidebarOpen ? "calc(100% - 220px)" : "calc(100% - 80px)",
        lg: isSidebarOpen ? "calc(100% - 230px)" : "calc(100% - 70px)",
      },
    }),
    [isSidebarOpen]
  );

  return (
    <>
      <Sidebar sideToggled={isSidebarOpen} onShowSidebar={toggleSidebar} />
      <Box {...toggledLayoutStyle}>
        <Header sideToggled={false} onShowSidebar={toggleSidebar} />
        <Container>{children}</Container>
      </Box>
    </>
  );
};
export default Layout;
