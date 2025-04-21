import { Center } from '@chakra-ui/react'
import { ModalComponent, BaseText, TextVariant } from '_components/custom'
import React, { useState } from 'react'
import { DeleteLottie } from '_lottie/animations/LottieAnimation'
import { ProductModule } from 'bvg-innovation-state-management'
import { IProductMoalProps } from './interface/modal-product'
import { useQueryClient } from '@tanstack/react-query'
import { TYPES } from 'bvg-innovation-shared'

export const DeleteProduct = ({ isOpen, onChange, selectedValues, deleteType = 'soft' }: IProductMoalProps) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = ProductModule.softDeleteProductMutation({
    onSuccess: () => {
      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
        onChange(false)
      }, 2200)
      queryClient.invalidateQueries({ queryKey: [ProductModule.constants.PRIVATE_PRODUCTS] })
    },
  })
  const [showAnimation, setShowAnimation] = useState(false)

  const handleDelete = async () => {
    if (deleteType === 'soft') {
      await mutateAsync(selectedValues?.id)
    } else {
      // dispatch(
      //   ProductModule.actions.deleteProductRequest({
      //     productId: selectedValues?.id,
      //   })
      // );
    }
  }

  return (
    <ModalComponent title={'Suppression'} open={isOpen} onChange={onChange} modalType={'alertdialog'} ignoreFooter={false} buttonSaveTitle={'Supprimer'} isLoading={isPending} onClick={handleDelete}>
      {showAnimation ? (
        <Center>
          <DeleteLottie />
        </Center>
      ) : (
        <>
          {deleteType === 'soft' ? (
            <BaseText variant={TextVariant.M}>Êtes-vous sûr de vouloir supprimer cet article ? Il sera placé dans la corbeille, vous pouvez toujours le récupérer.</BaseText>
          ) : (
            <BaseText variant={TextVariant.M}>Êtes-vous sûr de vouloir supprimer cet article ? Il sera placé supprimer definitivement cette action est irreversible.</BaseText>
          )}
        </>
      )}
    </ModalComponent>
  )
}
