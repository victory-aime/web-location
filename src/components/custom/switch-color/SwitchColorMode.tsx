import React from "react";
import { Switch } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "_/components/ui/color-mode";

const SwitchColorMode = ({ hideIcon = false }: { hideIcon?: boolean }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Switch.Root
      colorPalette={colorMode === "dark" ? "green" : "none"}
      onCheckedChange={toggleColorMode}
      mb={8}
      display={"flex"}
    >
      {!hideIcon ? (
        <>
          <LuSun />
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <LuMoon />
        </>
      ) : (
        <>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </>
      )}
    </Switch.Root>
  );
};

export default SwitchColorMode;
