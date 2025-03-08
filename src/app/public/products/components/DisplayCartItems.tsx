import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import useCart from "_/app/hooks/cart";
import { BaseButton } from "_/components/custom/button";
import { CustomToast } from "_/components/custom/toast/CustomToast";
import { ToastStatus } from "_/components/custom/toast/interface/toats";
import { MenuSeparator } from "_/components/ui/menu";
import { TrashIcon } from "_assets/svg";
import Image from "next/image";
import React, { useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DisplayCartItemsProps {
  items: CartItem[];
  setItems?: (items: CartItem[]) => void;
}

const DisplayCartItems: React.FC<DisplayCartItemsProps> = ({
  items,
  setItems,
}) => {
  const [loading, setLoading] = useState(false);

  const removeItem = (itemToRemove: CartItem) => {
    setLoading(true);
    setTimeout(() => {
      const updatedCart = items?.filter((item) => item.id !== itemToRemove.id);
      setItems && setItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      CustomToast({
        title: "Article supprimé",
        description: `${itemToRemove?.name} a été retiré du panier.`,
        type: ToastStatus.WARNING,
        duration: 2000,
      });

      setLoading(false);
    }, 1000);
  };

  const clearCart = () => {
    setLoading(true);
    setTimeout(() => {
      setItems && setItems([]);
      localStorage.removeItem("cart");
      CustomToast({
        title: "Panier vidé",
        description: "Tous les articles ont été supprimés.",
        type: ToastStatus.ERROR,
        duration: 2000,
      });

      setLoading(false);
    }, 1000);
  };

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
                onClick={() => removeItem(item)}
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
