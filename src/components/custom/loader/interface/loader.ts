import { BoxProps } from "@chakra-ui/react";

interface LoaderProps extends BoxProps {
  backDrop?: boolean;
  fullScreen?: boolean;
  show?: boolean;
}

export type { LoaderProps };
