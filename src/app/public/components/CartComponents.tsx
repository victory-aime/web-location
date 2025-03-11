import { Box, Float, Circle } from "@chakra-ui/react";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";

export const CartComponents = ({
  cart,
}: {
  cart: any[];
  removeItem: (item: { id: string; name: string }) => void;
  clearAllCartItems: () => void;
  loading: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      {/*{!responsiveMode ? (*/}
      {/*  <MenuRoot>*/}
      {/*    <MenuTrigger asChild>*/}
      {/*      <Box position="relative" cursor={"pointer"}>*/}
      {/*        {cart?.length > 0 && (*/}
      {/*          <Float>*/}
      {/*            <Circle size="5" bg="red" color="white">*/}
      {/*              {cart?.length}*/}
      {/*            </Circle>*/}
      {/*          </Float>*/}
      {/*        )}*/}
      {/*        <FaCartShopping size={22} />*/}
      {/*      </Box>*/}
      {/*    </MenuTrigger>*/}
      {/*    <MenuContent p={5}>*/}
      {/*      {cart.length === 0 ? (*/}
      {/*        <Flex*/}
      {/*          alignItems={"center"}*/}
      {/*          justifyContent={"center"}*/}
      {/*          boxSize={"45px"}*/}
      {/*        >*/}
      {/*          <TrashLottieAnimationV2 />*/}
      {/*        </Flex>*/}
      {/*      ) : (*/}
      {/*        <DisplayCartItems*/}
      {/*          items={cart}*/}
      {/*          removeItem={removeItem}*/}
      {/*          clearCart={clearAllCartItems}*/}
      {/*          loading={loading}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </MenuContent>*/}
      {/*  </MenuRoot>*/}
      {/*) : (*/}
      {/*  <Box*/}
      {/*    position="relative"*/}
      {/*    cursor={"pointer"}*/}
      {/*    onClick={() => router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.CHECKOUT)}*/}
      {/*  >*/}
      {/*    {cart?.length > 0 && (*/}
      {/*      <Float>*/}
      {/*        <Circle size="5" bg="red" color="white">*/}
      {/*          {cart?.length}*/}
      {/*        </Circle>*/}
      {/*      </Float>*/}
      {/*    )}*/}
      {/*    <FaCartShopping size={22} />*/}
      {/*  </Box>*/}
      {/*)}*/}
      <Box
        position="relative"
        cursor={"pointer"}
        onClick={() =>
          router.push(APP_ROUTES.PUBLIC.PRODUCTS_LIST.CHECKOUT.PROCESS)
        }
      >
        {cart?.length > 0 && (
          <Float>
            <Circle size="5" bg="red" color="white">
              {cart?.length}
            </Circle>
          </Float>
        )}
        <FaCartShopping size={22} />
      </Box>
    </>
  );
};
