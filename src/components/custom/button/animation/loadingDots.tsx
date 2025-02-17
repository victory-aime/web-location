import { Flex, Box } from "@chakra-ui/react";
import { keyframes } from "_theme/animations";

export const LoadingDots = ({ color = "white" }: { color?: string }) => {
  const animation = `${keyframes.dotBounce} 1.4s infinite`;
  return (
    <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          animation={animation}
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: color,
            borderRadius: "50%",
            animation: `${keyframes.dotBounce} 1.4s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Flex>
  );
};
