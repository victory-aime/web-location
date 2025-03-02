import { Box, Text, useSlider, Slider } from "@chakra-ui/react";
import React from "react";

const FilterPrice = () => {
  const slider = useSlider({
    defaultValue: [0],
    thumbAlignment: "center",
    min: 0,
    max: 2000,
  });
  return (
    <Box mb={8} p={3}>
      <Text>Price : ${slider.value}</Text>
      <Slider.RootProvider value={slider}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </Box>
  );
};

export default FilterPrice;
