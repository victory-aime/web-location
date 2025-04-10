import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Spinner,
  Image,
  Separator,
} from '@chakra-ui/react';
import { BaseButton } from '_/components/custom/button';
import { TrashIcon } from '_assets/svg';
import React from 'react';
import { useCart } from '_app/hooks/cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
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
  const { calculateTotalPrice } = useCart();

  return (
    <Box width={'full'} bgColor={'yellow'}>
      <Text mb={4}>Vous avez {items?.length} articles dans votre panier</Text>
      {items?.map((item) => (
        <Box key={item.id} width={'full'}>
          <Flex m={2} gap={5} justifyContent={'space-between'}>
            <Flex gap={3}>
              <Box boxSize={'65px'} bgColor={'yellow'}>
                <Image
                  src={item?.images[0] ?? 'https:avatar.iran.liara.run/public'}
                  alt="cart-images"
                  width={'full'}
                  height={'full'}
                  objectFit="cover"
                />
              </Box>

              <Box>
                <Stack>
                  <Text>{item?.name}</Text>
                  <Text fontWeight={'bold'} fontSize={'16px'}>
                    {item?.quantity} * ${item?.price}
                  </Text>
                </Stack>
              </Box>
            </Flex>
            <Flex justifyContent={'flex-end'} alignItems={'flex-end'}>
              <IconButton
                bgColor={'red'}
                boxSize={'35px'}
                rounded={'lg'}
                onClick={() => {
                  removeItem?.(item);
                  console.log('remove', item);
                }}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : <TrashIcon fill={'#fff'} />}
              </IconButton>
            </Flex>
          </Flex>
          <Separator />
        </Box>
      ))}
      <Box mt={5} width={'full'}>
        <Heading>Total : ${calculateTotalPrice(items)}</Heading>
        <Flex flexDir={'column'} gap={2} mt={2}>
          <BaseButton width={'full'}>Voir le panier</BaseButton>
          <BaseButton width={'full'} colorType="danger" onClick={clearCart} disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Supprimer mon panier'}
          </BaseButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default DisplayCartItems;
