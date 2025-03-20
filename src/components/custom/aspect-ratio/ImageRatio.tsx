import React, { FC } from "react";
import { IAspectRatioProps } from "./interface/aspect-ratio";
import { AspectRatio, Image } from "@chakra-ui/react";

const ImageRatio: FC<IAspectRatioProps> = ({
  image,
  ratio = 4 / 3,
  style,
  ...rest
}) => {
  return (
    <AspectRatio ratio={ratio} width={"full"} {...rest}>
      <Image
        src={image}
        alt="image"
        objectFit={"cover"}
        style={style}
        borderRadius={"7px"}
      />
    </AspectRatio>
  );
};

export default ImageRatio;
