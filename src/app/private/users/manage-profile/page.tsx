"use client";

import { Box, Flex } from "@chakra-ui/react";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserInfo from "../components/UserInfon";
import Profile from "../components/Profile";
import ManageAddress from "../components/ManageAddress";
import Favourite from "../components/Favourite";
import Settings from "../components/Settings";
import MyOrder from "../components/MyOrder";
import Header from "_/app/components/Header";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Profile />;
      case 1:
        return <MyOrder />;
      case 2:
        return <ManageAddress />;
      case 3:
        return <Favourite />;
      case 4:
        return <Settings />;

      default:
        return <Profile />;
    }
  };

  return (
    <Header>
      <Flex
        gap={{ base: "10px", lg: "20px" }}
        marginTop={"30px"}
        p={{ base: 5, md: 10 }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <UserInfo currentStep={currentStep} onChangeStep={setCurrentStep} />
        <Box width={"100%"}>{renderStep()}</Box>
      </Flex>
    </Header>
  );
};

export default ProfilePage;
