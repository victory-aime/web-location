import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { BaseButton } from "_/components/custom/button";
import { MenuSeparator } from "_/components/ui/menu";
import { TrashIcon } from "_assets/svg";
import Image from "next/image";
import React from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DisplayCartItemsProps {
  items: CartItem[];
  setItems?: (items: CartItem[]) => void;
  handleSubmit?: (value: FormData) => void;
  removeItem?: (item: { name: string; id: string }) => void;
  clearCart?: () => void;
  loading?: boolean;
}

const DisplayCartItems: React.FC<DisplayCartItemsProps> = ({
  items,
  removeItem,
  clearCart,
  loading = false,
}) => {
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box width={"full"}>
      <Text mb={4}>Vous avez {items?.length} articles dans votre panier</Text>
      {items?.map((item) => (
        <Box key={item.id}>
          <Flex m={2} gap={5} justifyContent={"space-between"}>
            <Flex gap={3}>
              <Box>
                <Image
                  src={"https:avatar.iran.liara.run/public"}
                  alt="cart-images"
                  width={45}
                  height={45}
                  unoptimized={true}
                />
              </Box>

              <Box>
                <Stack>
                  <Text>{item?.name}</Text>
                  <Text fontWeight={"bold"} fontSize={"16px"}>
                    {item?.quantity} * ${item?.price}
                  </Text>
                </Stack>
              </Box>
            </Flex>
            <Flex justifyContent={"flex-end"} alignItems={"flex-end"}>
              <IconButton
                bgColor={"red"}
                boxSize={"35px"}
                rounded={"lg"}
                onClick={() => {
                  removeItem && removeItem(item);
                  console.log("remove", item);
                }}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : <TrashIcon fill={"#fff"} />}
              </IconButton>
            </Flex>
          </Flex>
          <MenuSeparator />
        </Box>
      ))}
      <Box mt={5} width={"full"}>
        <Heading>Total : ${calculateTotalPrice()}</Heading>
        <Flex flexDir={"column"} gap={2} mt={2}>
          <BaseButton width={"full"}>Voir le panier</BaseButton>
          <BaseButton
            width={"full"}
            colorType="danger"
            onClick={clearCart}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Supprimer mon panier"}
          </BaseButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default DisplayCartItems;
