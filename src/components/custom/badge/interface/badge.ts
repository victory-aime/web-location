import { BadgeProps } from "@chakra-ui/react/badge";

type Status = "NEW" | "DONE" | "IN_PROGRESS" | "REJECTED";

interface Props extends BadgeProps {
  status?: Status;
  variant?: "outline" | "solid" | "subtle" | "surface" | "plain" | undefined;
  children?: React.ReactNode;
}

export type { Props, Status };
