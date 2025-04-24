import { Center } from '@chakra-ui/react'
import { ModalComponent, BaseText, TextVariant } from '_components/custom'
import React, { useState } from 'react'
import { DeleteLottie } from '_lottie/animations/LottieAnimation'
import { ProductModule } from 'bvg-innovation-state-management'
import { IProductMoalProps } from './interface/modal-product'
import { TrashIcon } from '_assets/svg'

export const DeleteProduct = ({ isOpen, onChange, selectedValues, deleteType = 'soft' }: IProductMoalProps) => {
  const { mutateAsync, isPending: softDeletePending } = ProductModule.softDeleteProductMutation({
    onSuccess: () => {
      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
        onChange(false)
      }, 2200)
      ProductModule.cache.ProductCache.invalidatePrivate()
    },
  })
  const { mutateAsync: deleteProduct, isPending: deletePermanentlyPending } = ProductModule.permanentlyDeleteProductMutation({
    onSuccess: () => {
      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
        onChange(false)
      }, 2200)
      ProductModule.cache.ProductCache.invalidatePrivate()
      ProductModule.cache.ProductCache.invalidateTrashList()
    },
  })
  const [showAnimation, setShowAnimation] = useState(false)

  const handleDelete = async () => {
    if (deleteType === 'soft') {
      await mutateAsync({ productId: selectedValues })
    } else {
      await deleteProduct({ productId: selectedValues })
    }
  }

  console.log('selectedValues', selectedValues)

  return (
    <ModalComponent
      icon={<TrashIcon />}
      title={'Suppression'}
      open={isOpen}
      onChange={onChange}
      modalType={'alertdialog'}
      ignoreFooter={false}
      buttonSaveTitle={'Supprimer'}
      isLoading={softDeletePending ?? deletePermanentlyPending}
      onClick={handleDelete}
    >
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
