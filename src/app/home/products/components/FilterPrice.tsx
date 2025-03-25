import { Box } from "@chakra-ui/react";
import SliderForm from "_/components/custom/form/SliderForm";
import React from "react";

const FilterPrice = ({
  name,
  onSliderChange,
}: {
  name: string;
  onSliderChange: (value: number) => void;
}) => {
  return (
    <Box mb={8} p={3}>
      <SliderForm
        name={name}
        label={"Price"}
        isNumber
        min={0}
        max={2000}
        onChangeFunction={onSliderChange}
      />
    </Box>
  );
};

export default FilterPrice;
