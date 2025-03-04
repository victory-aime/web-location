"use client";

import {
  Box,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import WebDisplay from "./WebDisplay";
import MobileMenu from "./MobileMenu";
import { ListMenu } from "_assets/svg";
import { TbUser } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";

const Header = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });

  return (
    <>
      <Box>
        {/* Menu */}
        <Box display={{ base: "block", sm: "block", lg: "none" }}>
          <Flex
            m={{ base: "3" }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex alignItems={"center"} gap={5}>
              <IconButton
                bgColor={"white"}
                aria-label="menu"
                onClick={() => setOpen(true)}
              >
                <ListMenu />
              </IconButton>
              <Text fontSize={"22px"}>E-shop</Text>
            </Flex>
            <Flex gap={5} alignItems={"center"} justifyContent={"center"}>
              <IoIosHeartEmpty size={22} />
              <FaCartShopping size={22} />
              <IconButton
                bgColor={"primary.500"}
                aria-label="user-icon"
                onClick={() => router?.push(APP_ROUTES.PUBLIC.SIGN_IN)}
              >
                <TbUser size={18} />
              </IconButton>
            </Flex>
          </Flex>
          <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
            {({ values, handleSubmit, setFieldValue }) => (
              <Flex width={"full"} p={{ base: "3" }}>
                <FormTextInput
                  name={"search"}
                  placeholder="Recherchez votre produit"
                  leftAccessory={<RiSearch2Line />}
                  onChangeFunction={(e: any) => {
                    setFieldValue("search", e?.target.value);
                  }}
                  value={values?.search}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </Flex>
            )}
          </Formik>
        </Box>
        {responsiveMode ? (
          <WebDisplay />
        ) : (
          <MobileMenu open={open} onChange={() => setOpen(false)} />
        )}
      </Box>
      <Box>{children}</Box>
    </>
  );
};

export default Header;
