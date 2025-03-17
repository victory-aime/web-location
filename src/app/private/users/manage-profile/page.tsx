"use client";

import { Box, Flex } from "@chakra-ui/react";
import { AuthModule } from "_/store/src/modules";
import { useSelector } from "react-redux";
import { useState } from "react";
import Header from "_/app/public/components/Header";
import UserInfo from "../components/UserInfon";
import Profile from "../components/Profile";
import ManageAddress from "../components/ManageAddress";
import Favourite from "../components/Favourite";
import Settings from "../components/Settings";

const ProfilePage = () => {
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const [currentStep, setCurrentStep] = useState(0);
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Profile />;
      case 1:
        return <ManageAddress />;
      case 2:
        return <Favourite />;
      case 3:
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
        <UserInfo
          currentUser={currentUser}
          currentStep={currentStep}
          onChangeStep={setCurrentStep}
        />
        <Box width={"100%"} p={{ base: 0, md: 10 }}>
          {renderStep()}
        </Box>
      </Flex>
    </Header>
  );
};

export default ProfilePage;
