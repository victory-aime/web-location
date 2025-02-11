import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<any>(null);
  const pathname = usePathname();
  /**
   * For scroll container div
   */
  useEffect(() => {
    containerRef?.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex
      ref={containerRef}
      width={"full"}
      maxHeight={"100%"}
      position={"relative"}
      overflowX={"hidden"}
      overflowY={"auto"}
      pb={{ base: "20px", md: "0" }}
    >
      <Box flex={1} maxW="100%">
        <Flex
          direction={{ base: "column", xl: "row" }}
          w="100%"
          maxWidth={"100vw"}
          justifyContent={"space-between"}
          h={"100%"}
        >
          <Box
            className={"mainContent"}
            overflowX={"hidden"}
            overflowY={"auto"}
            width="100%"
            ps={{ base: 5, md: "20px" }}
            pe={{ base: 5, md: "33px" }}
            pb={{ base: "1rem", xl: "4rem" }}
            flex={1}
          >
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Container;
