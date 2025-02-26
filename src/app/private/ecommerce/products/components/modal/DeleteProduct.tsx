import { Center, Text } from "@chakra-ui/react";
import { ModalComponent } from "_/components/custom/modal";
import React, { useEffect, useState } from "react";
import { DeleteLottie } from "_lottie/animations/LottieAnimation";
import { useSelector, useDispatch } from "react-redux";
import { ProductModule } from "_/store/src/modules";
import { IProductMoalProps } from "./interface/modal-product";

const DeleteProduct = ({
  isOpen,
  onChange,
  selectedValues,
  deleteType = "soft",
}: IProductMoalProps) => {
  const dispatch = useDispatch();
  const { deleteProduct, isLoading } = useSelector(
    ProductModule.selectors.productSelector
  );

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (deleteProduct) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        onChange(false);
      }, 2200);
    }
  }, [deleteProduct]);

  const handleDelete = () => {
    if (deleteType === "soft") {
      dispatch(
        ProductModule.actions.softDeleteRequestAction({
          productId: selectedValues?.id,
        })
      );
    } else {
      dispatch(
        ProductModule.actions.deleteProductRequest({
          productId: selectedValues?.id,
        })
      );
    }
  };

  return (
    <ModalComponent
      title={"Suppression"}
      open={isOpen}
      onChange={onChange}
      modalType={"alertdialog"}
      ignoreFooter={false}
      buttonSaveTitle={"Supprimer"}
      isLoading={isLoading}
      onClick={handleDelete}
    >
      {showAnimation ? (
        <Center>
          <DeleteLottie />
        </Center>
      ) : (
        <>
          {deleteType === "soft" ? (
            <Text>
              Êtes-vous sûr de vouloir supprimer cet article ? Il sera placé
              dans la corbeille, vous pouvez toujours le récupérer.
            </Text>
          ) : (
            <Text>
              Êtes-vous sûr de vouloir supprimer cet article ? Il sera placé
              supprimer definitivement cette action est irreversible.
            </Text>
          )}
        </>
      )}
    </ModalComponent>
  );
};

export default DeleteProduct;
