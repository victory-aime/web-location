"use client";

import Header from "_/app/public/components/Header";
import React from "react";
import Profile from "../components/Profile";

const MyProfilePage = () => {
  return (
    <>
      <Header>
        <Profile />
      </Header>
    </>
  );
};

export default MyProfilePage;
