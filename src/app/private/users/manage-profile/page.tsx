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
import ProtectedRoute from "_/app/layout/protected/ProtectedRoute";
import MyOrder from "../components/MyOrder";

const ProfilePage = () => {
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
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
    <ProtectedRoute>
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
          <Box width={"100%"}>{renderStep()}</Box>
        </Flex>
      </Header>
    </ProtectedRoute>
  );
};

export default ProfilePage;
