"use client";
import {
  Box,
  Text,
  Flex,
  Stack,
  Image,
  Heading,
  HStack,
  FormatNumber,
  Float,
  Circle,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { UTILS } from "_/store/src";
import { useSelector } from "react-redux";
import { ProductModule } from "_store/src/modules";
import { CustomBadge } from "_components/custom/badge";
import { BaseButton } from "_components/custom/button";
import { BsHeart } from "react-icons/bs";
import { StepperInput } from "_components/ui/stepper-input";
import { Avatar } from "_components/ui/avatar";
import CustomProductList from "../components/CustomProductList";
import { useDispatch } from "react-redux";
import { CustomToast } from "_/components/custom/toast/CustomToast";
import { ToastStatus } from "_/components/custom/toast/interface/toats";

const PublicDetailsProducts = () => {
  const requestId = useSearchParams()?.get("requestId");
  const dispatch = useDispatch();
  const { publicProducts } = useSelector(
    ProductModule.selectors.productSelector
  );
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const findItem = UTILS.findDynamicIdInList(requestId ?? "", publicProducts);

  const findSameCategoriesItem = publicProducts?.filter(
    (value) =>
      value.categoryName === findItem?.categoryName && value.id !== findItem?.id
  );

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (requestId && findItem) {
      setImages(findItem?.images);
      setSelectedImage(findItem.images?.[0] || null);
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find((item: any) => item.id === findItem.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [requestId, findItem]);

  const addItemToCart = () => {
    setLoading(true);
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const imagesAsFiles = cart.images?.map((base64: string, index: number) =>
        UTILS.base64ToFile(base64, `image_${index}.jpg`)
      );
      const existingItemIndex = cart.findIndex(
        (item: any) => item.id === findItem.id
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ ...findItem, images: imagesAsFiles, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setQuantity((prev) => prev + 1);
      setLoading(false);
      CustomToast({
        description: "Produit ajouter au panier",
        duration: 3000,
      });
    }, 1500);
  };

  const updateQuantity = (newQuantity: number) => {
    setLoading(true);
    setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cart.findIndex(
        (item: any) => item.id === findItem.id
      );

      if (existingItemIndex !== -1) {
        if (newQuantity === 0) {
          cart.splice(existingItemIndex, 1);
        } else {
          cart[existingItemIndex].quantity = newQuantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setQuantity(newQuantity);
        CustomToast({
          type: ToastStatus.INFO,
          description: "Produit mis a jour",
          duration: 3000,
        });
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <Header>
      <Box p={5} width="full" mt={5}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {/* Section Images */}
          <Box flex={1}>
            {/* Image principale sur PC */}

            <Flex width="100%" maxH={"500px"} position={"relative"}>
              <Float placement={{ base: "top-center", md: "top-end" }}>
                <Circle size="45px" bg="white" color="red">
                  <BsHeart />
                </Circle>
              </Float>
              <Image
                src={selectedImage}
                borderRadius="12px"
                width={"full"}
                objectFit="cover"
                display={{ base: "none", md: "block" }}
              />
            </Flex>

            {/* Miniatures sur PC */}
            <HStack gap={2} mt={3} display={{ base: "none", md: "flex" }}>
              {images?.map((img: string, index: number) => (
                <Image
                  key={index}
                  src={img}
                  boxSize="80px"
                  borderRadius="8px"
                  cursor="pointer"
                  border={selectedImage === img ? "2px solid #3182CE" : "none"}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </HStack>

            {/* Affichage en défilement horizontal sur mobile */}
            <Flex
              overflowX="auto"
              gap={1}
              display={{ base: "flex", md: "none" }}
              width="100%"
              p={2}
            >
              {images?.map((img: string, index: number) => (
                <Image key={index} src={img} borderRadius="12px" width="100%" />
              ))}
            </Flex>
          </Box>

          {/* Section Détails */}
          <Box flex={1} width={"full"} position={"relative"}>
            <Stack gap={3}>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Heading>{findItem?.name}</Heading>
                <CustomBadge type="product" status={findItem?.status} />
              </Flex>
              <Stack gap={2}>
                <Text fontWeight="bold" color="gray.600">
                  {findItem?.category}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Avis & Notes ici
                </Text>
                <FormatNumber
                  notation="compact"
                  value={findItem?.price}
                  style="currency"
                  currency="USD"
                />
              </Stack>
              <Text fontSize="md">{findItem?.description}</Text>
            </Stack>
            <Stack mt={8}>
              <Box>
                <Text>Color</Text>
                <Text>display item here</Text>
              </Box>
              <Box>
                <Text>Color</Text>
                <Text>display item here</Text>
              </Box>
            </Stack>
            <Flex width={"full"} mt={8} p={5} gap={5} alignItems={"center"}>
              {loading ? (
                <Spinner />
              ) : quantity > 0 ? (
                <StepperInput
                  defaultValue={quantity?.toString()}
                  min={1}
                  max={findItem?.stock}
                  disabled={loading}
                  onValueChange={(e) =>
                    updateQuantity(e.value as unknown as number)
                  }
                />
              ) : (
                <BaseButton
                  width={"full"}
                  p={"25px"}
                  withGradient
                  colorType={"success"}
                  onClick={addItemToCart}
                >
                  Ajouter au panier
                </BaseButton>
              )}
            </Flex>
          </Box>
        </Flex>
        <Box mt={"50px"}>
          <Heading>Reviews</Heading>
          <Box mt={"20px"}>
            <Flex alignItems={"center"} gap={4}>
              <Avatar size={"2xl"} />
              <Stack gap={1}>
                <Text>username here</Text>
                <Text>star here</Text>
              </Stack>
            </Flex>
            <Stack gap={2} mt={4}>
              <Text>Title here</Text>
              <Text>Description here</Text>
              <Text>createdReview here</Text>
            </Stack>
            <Separator colorPalette={"gray"} mt={5} />
          </Box>
        </Box>
        <Box mt={"50px"}>
          <Heading>Related Products</Heading>
          <Box mt={"20px"} p={{ base: 2, lg: 5 }}>
            <CustomProductList
              products={findSameCategoriesItem}
              initialPage={1}
              pageSize={findSameCategoriesItem?.slice(0, 4).length}
              hidePagination
              lazy={false}
            />
          </Box>
        </Box>
      </Box>
    </Header>
  );
};

export default PublicDetailsProducts;
