"use client";
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "_components/ui/steps";
import { LuUser } from "react-icons/lu";
import { Box, For } from "@chakra-ui/react";
import React, { FC, ReactNode, useState } from "react";

interface StepperProps {
  steps: {
    icon: ReactNode;
    content: ReactNode | string | any;
    label: string;
    stepNumber: number;
  }[];
  goNextSteps: (step: number) => void;
}

const CustomStepper: FC<StepperProps> = ({ steps, goNextSteps }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleStepChange = (step: number) => {
    const index = steps.findIndex((item) => item.stepNumber === step);
    if (index !== -1) setCurrentIndex(index);
  };
  return (
    <StepsRoot
      minHeight={{ base: "100%", md: "300px" }}
      w={"100%"}
      //linear={true}
      count={steps?.length}
      defaultValue={steps[currentIndex]?.stepNumber}
      variant={"solid"}
      onStepChange={({ step }) => handleStepChange(step)}
      onStepComplete={() => {
        const nextStep = currentIndex + 1;
        if (nextStep < steps.length) {
          setCurrentIndex(nextStep);
          goNextSteps(nextStep);
        }
      }}
    >
      <StepsList width={"full"}>
        <For each={steps}>
          {(item, index) => (
            <StepsItem
              color={currentIndex === index ? "primary.500" : "gray.400"}
              key={index}
              index={index}
              icon={item?.icon ?? <LuUser />}
            />
          )}
        </For>
      </StepsList>
      <Box mt={5} mb={50} bgColor={"red"}>
        <For each={steps}>
          {(item, index) => (
            <StepsContent
              key={index}
              index={index}
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              {index === currentIndex && item.content}
            </StepsContent>
          )}
        </For>
      </Box>
      <StepsCompletedContent>All steps are complete!</StepsCompletedContent>
    </StepsRoot>
  );
};

export default CustomStepper;
