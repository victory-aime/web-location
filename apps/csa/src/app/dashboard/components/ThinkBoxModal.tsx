'use client'

import { VStack } from '@chakra-ui/react'
import { FormTextArea, FormTextInput, CustomToast } from '_components/custom'
import { ModalComponent } from '_components/custom/modal'
import { ModalOpenProps } from '_components/custom/modal/interface/modal'
import { hexToRGB } from '_theme/colors'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import React, { FC, useState } from 'react'
import { FcIdea } from 'react-icons/fc'
import axios from 'axios'
import { UsersModule } from 'bvg-innovation-state-management'
import { useQueryClient } from '@tanstack/react-query'
import { TYPES } from 'bvg-innovation-shared'

export interface InitialFormValues {
  subject: string
  message: string
}

const ThinkBoxModal: FC<ModalOpenProps> = ({ isOpen, onChange, callback = () => {} }) => {
  const queryClient = useQueryClient()
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (values: FormikValues, { resetForm }: FormikHelpers<InitialFormValues>) => {
    const emailDto = {
      sender: {
        name: cachedUser?.name + ' ' + cachedUser?.firstName,
        email: cachedUser?.email,
      },
      subject: values.subject,
      message: values.message,
    }
    setIsLoading(true)
    const promise = axios.post(`api/send-email`, emailDto, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    CustomToast({
      asPromise: {
        promise,
        config: {
          loading: { title: 'Envoi en cours...', description: 'Veuillez Patientez' },
          success: {
            title: 'Message envoye avec success!',
            description: 'Votre idee a bien été envoyée',
          },
          error: {
            title: "Erreur d'envoi",
            description: "Une erreur est survenue lors de l'envoi de votre message",
          },
          loader: () => {
            setIsLoading(false)
            resetForm()
          },
        },
      },
    })
  }

  return (
    <Formik initialValues={{ subject: '', message: '' }} onSubmit={handleSubmitForm}>
      {({ handleSubmit, setFieldValue }) => (
        <ModalComponent
          open={isOpen}
          onChange={() => onChange(!isOpen)}
          title="Boite a suggestions"
          icon={<FcIdea size={18} />}
          iconBackroungColor={hexToRGB('orange', 0.3)}
          ignoreFooter={false}
          isLoading={isLoading}
          buttonSaveTitle={'Envoyer mon idee'}
          onClick={handleSubmit}
        >
          <VStack gap={4}>
            <FormTextInput name="subject" label="Titre" placeholder="Mettez un titre" />
            <FormTextArea name="message" label="Votre message" placeholder="Ecrivez ce que vous pensez" onChangeFunction={(e: any) => setFieldValue('message', e?.target.value)} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}

export default ThinkBoxModal
