"use client";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "_components/ui/steps";
import { Box, For, useBreakpointValue, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { BaseText, TextVariant } from "_components/custom/base-text";
import { StepperProps } from "./interface/stepper";

const CustomStepper: FC<StepperProps> = ({ steps, goNextSteps, stepTitle }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const responsive = useBreakpointValue({ base: true, sm: false, lg: false });

  const handleStepChange = (step: number) => {
    const index = steps.findIndex((item) => item.stepNumber === step);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    goNextSteps(currentIndex);
  }, [currentIndex]);

  return (
    <StepsRoot
      w={"100%"}
      linear
      count={steps?.length}
      defaultValue={steps[currentIndex]?.stepNumber}
      variant={"solid"}
      colorPalette={"teal"}
      onStepChange={({ step }) => {
        handleStepChange(step);
      }}
    >
      {stepTitle && <BaseText variant={TextVariant.H2}>{stepTitle}</BaseText>}

      <StepsList width={"full"} mt={5}>
        <For each={steps}>
          {(item, index) => (
            <Box width={"full"} key={index}>
              {responsive ? (
                <VStack gap={2} key={index} width={"full"} alignItems={"start"}>
                  <StepsItem
                    width={"full"}
                    key={index}
                    index={index}
                    icon={item?.icon}
                  />
                  <BaseText variant={TextVariant.XS}>{item?.label}</BaseText>
                </VStack>
              ) : (
                <StepsItem
                  key={index}
                  width={"full"}
                  title={item?.label}
                  index={index}
                  icon={item?.icon}
                />
              )}
            </Box>
          )}
        </For>
      </StepsList>

      <Box mt={5}>
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
              {item.content({
                NextTrigger: ({ children }) => (
                  <StepsNextTrigger>{children}</StepsNextTrigger>
                ),
                PrevTrigger: ({ children }) => (
                  <StepsPrevTrigger>{children}</StepsPrevTrigger>
                ),
              })}
            </StepsContent>
          )}
        </For>
      </Box>
    </StepsRoot>
  );
};

export default CustomStepper;
