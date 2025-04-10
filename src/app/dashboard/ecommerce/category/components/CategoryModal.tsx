import { Text, VStack } from '@chakra-ui/react';
import { FormTextInput, FormTextArea } from '_/components/custom/form';
import { ModalComponent } from '_/components/custom/modal';
import { Formik, Form } from 'formik';
import React from 'react';
import { ProductContainer } from '../../products/components';

const CategoryModal = ({
  open,
  onChange,
  values,
}: {
  open: boolean;
  values: any;
  onChange: (value: any) => void;
}) => {
  return (
    <ModalComponent
      title={values ? 'Ajouter une categorie' : 'Modifier cette categorie'}
      open={open}
      onChange={onChange}
    >
      <ProductContainer
        title={'Informations Generales'}
        tooltip={
          values
            ? 'Saisir les informations generales de la categorie'
            : 'Modifier les informations generales de la categorie'
        }
      >
        <Formik
          enableReinitialize
          initialValues={{
            productName: '',
            productDesc: '',
          }}
          onSubmit={() => {}}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <VStack mt={10} gap={4} align="stretch" width="100%">
                <FormTextInput name="productName" label="Nom" placeholder="john" />
                <FormTextArea
                  name={'productDesc'}
                  label={'Description'}
                  placeholder={'Saisissez la description du produit ici...'}
                  onChangeFunction={(e: any) => setFieldValue('productDesc', e.target.value)}
                />
              </VStack>
            </Form>
          )}
        </Formik>
      </ProductContainer>
    </ModalComponent>
  );
};

export default CategoryModal;
