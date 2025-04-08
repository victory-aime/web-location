import { Box } from "@chakra-ui/react";
import BoxContainer from "_/components/custom/container/BoxContainer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { WishlistModule } from "_/store/src/modules";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { Session } from "next-auth";
import CustomProductList from "_/app/home/products/components/CustomProductList";
import CustomSkeletonLoader from "_/components/custom/custom-skeleton/CustomSkeletonLoader";

const Favourite = ({ session }: { session: Session }) => {
  const { wishlist, loading, success } = useSelector(
    WishlistModule.selectors.wishlistSelector
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(wishlist?.content)) {
      dispatch(
        WishlistModule.actions.getWishlist({
          userId: session?.keycloakId ?? "",
        })
      );
    }
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(WishlistModule.actions.clearWishlistStore());
      dispatch(
        WishlistModule.actions.getWishlist({
          userId: session?.keycloakId ?? "",
        })
      );
    }
  }, [success]);

  const deleteItem = (item: string) => {
    dispatch(
      WishlistModule.actions.removeWishlistItem({
        userId: session?.keycloakId ?? "",
        productId: item ?? "",
      })
    );
  };

  return (
    <BoxContainer border={"none"} p={{ base: 5, md: 10 }}>
      {loading ? (
        <Box width={"full"} height={"full"}>
          <CustomSkeletonLoader type="PRODUCT_LIST_CARD" />
        </Box>
      ) : (
        <CustomProductList
          products={wishlist?.content?.map((item) => item?.product)}
          initialPage={1}
          totalItems={5}
          pageSize={5}
          hidePagination
          showDeleteButton
          onDeleteButton={deleteItem}
          lazy
        />
      )}
    </BoxContainer>
  );
};

export default Favourite;
