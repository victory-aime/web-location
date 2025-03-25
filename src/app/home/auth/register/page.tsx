"use client";

import React, { useState } from "react";
import RegisterComponent from "../components/RegisterComponent";
import { Box, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import AuthBox from "../components/AuthBox";
import { CustomRadioCard } from "_/components/custom/radio-card/CustomRadioCard";
import { RiPaypalFill, RiAppleFill } from "react-icons/ri";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("Utilisateur");
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });
  const items = [
    {
      label: "Utilisateur",
      icon: <RiPaypalFill />,
      desc: "Créez un compte utilisateur pour parcourir notre catalogue, ajouter des produits à votre panier et effectuer des achats en toute sécurité.",
    },
    {
      label: "Marchand",
      icon: <RiAppleFill />,
      desc: "Inscrivez-vous en tant que marchand pour créer et gérer votre boutique en ligne, ajouter des produits et suivre vos ventes en temps réel.",
    },
  ];

  return (
    <AuthBox isResponsive={responsiveMode ?? false}>
      {responsiveMode ? (
        <Box width={"full"} position={"relative"}>
          <Image
            src={"/assets/images/auth/register-background.png"}
            alt={"login-background"}
          />
          <Box position={"absolute"} top={0} left={0} m={"30px"}>
            <Text fontSize={"45px"}>E-shop</Text>
          </Box>
        </Box>
      ) : (
        <Box p={"20px"}>
          <Text fontSize={"25px"}>E-shop</Text>
        </Box>
      )}

      <Box width={"full"} p={{ base: 6, md: 6 }}>
        <CustomRadioCard
          items={items}
          onValueChange={({ value }: { value: string }) =>
            setSelectedRole(value)
          }
        />
        {selectedRole === "Marchand" ? (
          <Text>Marchand</Text>
        ) : (
          <RegisterComponent selectedRole={selectedRole} />
        )}
      </Box>
    </AuthBox>
  );
};

export default Register;
