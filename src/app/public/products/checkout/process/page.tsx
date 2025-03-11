// "use client";
//
// import Header from "_app/public/components/Header";
// import BoxContainer from "_components/custom/container/BoxContainer";
// import { BaseText, TextVariant } from "_components/custom/base-text";
// import { Box, Button, Flex, Group } from "@chakra-ui/react";
// import {
//   StepsCompletedContent,
//   StepsContent,
//   StepsItem,
//   StepsList,
//   StepsNextTrigger,
//   StepsPrevTrigger,
//   StepsRoot,
// } from "_components/ui/steps";
// import { LuCalendar, LuUser, LuWallet } from "react-icons/lu";
// import React, { ReactNode, useCallback, useState } from "react";
// import CustomStepper from "_components/custom/stepper/CustomStepper";
// import { BaseButton } from "_components/custom/button";
//
// const CheckoutProcess = () => {
//   const [activeStep, setActiveStep] = useState(0);
//
//   const handleNextStep = (index: number) => {
//     setActiveStep(index);
//   };
//
//   const onSubmit = useCallback((step?: number) => {
//     handleNextStep(step ?? activeStep + 1);
//   }, []);
//
//   const goBack = (step: number) => {
//     setActiveStep(step);
//   };
//
//   const FirstSteps = ({ onSubmit }) => {
//     return (
//       <Box>
//         <BaseButton onClick={onSubmit}>GoNext</BaseButton>
//       </Box>
//     );
//   };
//   const steps = [
//     {
//       content: <FirstSteps onSubmit={onSubmit} />,
//       label: "steps",
//       stepNumber: 0,
//     },
//     {
//       content: "hello2",
//       label: "steps",
//       stepNumber: 1,
//     },
//     {
//       content: "hello3",
//       label: "steps",
//       stepNumber: 2,
//     },
//     {
//       content: "hello4",
//       label: "steps",
//       stepNumber: 3,
//     },
//   ];
//
//   return (
//     <Header>
//       <BoxContainer borderWidth={"none"}>
//         <BaseText variant={TextVariant.H2}>Shipping address</BaseText>
//         <Flex gap={20} width={"full"}>
//           <Box mt={5} width={"full"}>
//             <CustomStepper steps={steps} goNextSteps={handleNextStep} />
//           </Box>
//           <Box mt={5} width={"full"}>
//             <StepsRoot defaultValue={1} count={3}>
//               <StepsList>
//                 <StepsItem index={0} icon={<LuUser />} />
//                 <StepsItem index={1} icon={<LuWallet />} />
//                 <StepsItem index={2} icon={<LuCalendar />} />
//               </StepsList>
//
//               <StepsContent index={0}>Contact Details</StepsContent>
//               <StepsContent index={1}>Payment</StepsContent>
//               <StepsContent index={2}>Book an Appointment</StepsContent>
//               <StepsCompletedContent>
//                 All steps are complete!
//               </StepsCompletedContent>
//
//               <Group>
//                 <StepsPrevTrigger asChild>
//                   <Button variant="outline" size="sm">
//                     Prev
//                   </Button>
//                 </StepsPrevTrigger>
//                 <StepsNextTrigger asChild>
//                   <Button variant="outline" size="sm">
//                     Next
//                   </Button>
//                 </StepsNextTrigger>
//               </Group>
//             </StepsRoot>
//           </Box>
//         </Flex>
//       </BoxContainer>
//     </Header>
//   );
// };
//

"use client";
import React, { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { LuUser, LuCalendar, LuWallet } from "react-icons/lu";
import CustomStepper from "_components/custom/stepper/CustomStepper"; // Assure-toi que le chemin est correct

const CheckoutProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      stepNumber: 1,
      label: "Informations personnelles",
      icon: <LuUser />,
      content: (
        <VStack>
          <Text>Remplissez vos informations personnelles ici.</Text>
          <Button onClick={() => handleNextStep()}>Suivant</Button>
        </VStack>
      ),
    },
    {
      stepNumber: 2,
      label: "Choisir une date",
      icon: <LuCalendar />,
      content: (
        <VStack>
          <Text>Sélectionnez une date pour votre réservation.</Text>
          <Button onClick={() => handleNextStep()}>Suivant</Button>
        </VStack>
      ),
    },
    {
      stepNumber: 3,
      label: "Paiement",
      icon: <LuWallet />,
      content: (
        <VStack>
          <Text>Effectuez votre paiement pour confirmer.</Text>
          <Button onClick={() => handleNextStep()}>Finaliser</Button>
        </VStack>
      ),
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      console.log("current", currentStep);
    }
  };

  return <CustomStepper steps={steps} goNextSteps={handleNextStep} />;
};

export default CheckoutProcess;
