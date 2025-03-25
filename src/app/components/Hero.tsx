import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Box p={{ base: 0, lg: 10 }}>
      <Box p={{ base: 5, lg: 10 }} bgColor={"gray.900"} mt={50}>
        <Flex
          flexDir={{ base: "column-reverse", lg: "row" }}
          alignItems={"center"}
          gap={5}
          justifyContent={"space-between"}
        >
          <Container>
            <VStack
              align="start"
              maxW="600px"
              gap={6}
              p={8}
              borderRadius="lg"
              backdropFilter="blur(10px)"
            >
              <Heading size="2xl" color={"white"}>
                Summer Collection 2024
              </Heading>
              <Text fontSize="xl" color={"white"}>
                Discover our latest arrivals with up to 40% off on selected
                items
              </Text>
              <Button size="lg" p={"10px"} rounded={"lg"} colorPalette="blue">
                Shop Now
              </Button>
            </VStack>
          </Container>
          <Box w={"full"}>
            <Image src="/assets/images/hero/hero-2.jpg" borderRadius={"12px"} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;

// import React from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Heading,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// const Hero = () => {
//   return (
//     <Box
//       bg="gray.50"
//       py={16}
//       px={16}
//       backgroundImage="url('/assets/images/hero/hero-2.jpg')"
//       height={"80vh"}
//       width={"100vw"}
//       backgroundSize="cover"
//       backgroundPosition="center"
//       backgroundRepeat={"no-repeat"}
//     >
//       <Container maxW="1200px">
//         <VStack
//           align="start"
//           maxW="600px"
//           gap={6}
//           bg="white"
//           p={8}
//           borderRadius="lg"
//           backdropFilter="blur(10px)"
//         >
//           <Heading size="2xl">Summer Collection 2024</Heading>
//           <Text fontSize="xl">
//             Discover our latest arrivals with up to 40% off on selected items
//           </Text>
//           <Button size="lg" colorScheme="blue">
//             Shop Now
//           </Button>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// export default Hero;
