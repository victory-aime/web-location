import { Box, Center, Flex, For, Separator, VStack } from "@chakra-ui/react";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_components/custom/base-text";
import { useCart } from "_app/hooks/cart";
import React, { useEffect, useState } from "react";
import CustomFormatNumber from "_components/custom/format-number/CustomFormatNumber";
import { BaseButton } from "_components/custom/button";
import ModalComponent from "_components/custom/modal/ModalComponent";
import { APP_ROUTES } from "_app/config/routes";
import { useRouter } from "next/navigation";
import ImageRatio from "_/components/custom/aspect-ratio/ImageRatio";

const RecapOrder = ({
  cart,
  Next,
  Previous,
}: {
  Next: any;
  Previous: any;
  cart: any[];
}) => {
  const { setCart, fetchCartFromStorage } = useCart();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (cart?.length === 0) {
      fetchCartFromStorage().then((data) => setCart(data));
    }
  }, []);

  return (
    <Box>
      <Box>
        <For each={cart}>
          {(item, index) => (
            <Box key={index} width={"full"} mt={6}>
              <Flex
                gap={5}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                width={"full"}
              >
                <Box width={"200px"}>
                  <ImageRatio image={item?.images[0]} />
                </Box>

                <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
                  <BaseText flexWrap={"wrap"} variant={TextVariant.M}>
                    {item?.name}
                  </BaseText>
                  <BaseText
                    variant={TextVariant.M}
                    fontWeight={TextWeight.Regular}
                  >
                    <CustomFormatNumber value={item?.price} />
                  </BaseText>
                </VStack>
              </Flex>
              {cart?.length > 2 && <Separator mt={3} mb={3} />}
            </Box>
          )}
        </For>
      </Box>
      <Box mt={4}>
        <BaseText>Address de Livraison</BaseText>
        <VStack alignItems={"flex-start"} justifyContent={"flex-start"} mt={5}>
          <BaseText>Address Name</BaseText>
          <BaseText>Address desc</BaseText>
        </VStack>
      </Box>
      <Flex width={"full"} justifyContent={"center"} gap={5}>
        <Previous>
          <BaseButton bg={"gray"}>Revenir</BaseButton>
        </Previous>
        <Next>
          <BaseButton
            colorType={"secondary"}
            onClick={() => setOpenModal(true)}
          >
            Commander
          </BaseButton>
        </Next>
      </Flex>
      {openModal && (
        <ModalComponent
          open={openModal}
          onChange={() => {
            setOpenModal(false);
          }}
          title={"C'est fait"}
          showCloseButton={false}
          size={"md"}
        >
          <Center flexDir={"column"} gap={4}>
            <BaseText>Votre commande est confirmée</BaseText>
            <BaseText textAlign={"center"} lineHeight={"1.8"}>
              Merci pour vos achats ! Votre commande n'a pas encore été
              expédiée, mais nous vous enverrons un email lorsque ce sera fait.
            </BaseText>
            <Box width={"full"}>
              <BaseButton
                width={"full"}
                bg={"gray"}
                onClick={() => router.push(APP_ROUTES.PUBLIC.HOME)}
              >
                Revenir a l'acceuil
              </BaseButton>
              <BaseButton
                width={"full"}
                mt={2}
                colorType={"secondary"}
                onClick={() => router.push(APP_ROUTES.PUBLIC.HOME)}
              >
                Voir vos commandes
              </BaseButton>
            </Box>
          </Center>
        </ModalComponent>
      )}
    </Box>
  );
};

export default RecapOrder;
