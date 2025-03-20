import { AspectRatioProps } from "@chakra-ui/react/aspect-ratio";

export interface IAspectRatioProps extends AspectRatioProps {
  image?: string;
  style?: React.CSSProperties;
}
