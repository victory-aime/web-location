import * as Yup from 'yup';
import i18n from '_/store/src/locales/i18n/i18n';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required(i18n.t('COMMON.REQUIRED')),
  password: Yup.string()
    .min(8, i18n.t('COMMON.MIN_LENGTH', { count: 8 }))
    .required(i18n.t('COMMON.REQUIRED')),
});

export const singUpStepOneValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('COMMON.REQUIRED')),
  lastName: Yup.string().required(i18n.t('COMMON.REQUIRED')),
  email: Yup.string()
    .email('Email invalide')
    .required(i18n.t('COMMON.REQUIRED')),
  password: Yup.string()
    .min(8, i18n.t('COMMON.MIN_LENGTH', { count: 8 }))
    .required(i18n.t('COMMON.REQUIRED')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
    .required(i18n.t('COMMON.REQUIRED')),
  phone: Yup.string().required(i18n.t('COMMON.REQUIRED')),
});

export const singUpStepTwoValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le nom de l'école est requis")
    .min(3, "Le nom de l'école doit contenir au moins 3 caractères"),
  country: Yup.string()
    .required('Le pays est requis')
    .min(2, 'Le nom du pays doit contenir au moins 2 caractères'),
  city: Yup.string()
    .required('La ville est requise')
    .min(2, 'Le nom de la ville doit contenir au moins 2 caractères'),
  address: Yup.string()
    .required("L'adresse de l'école est requise")
    .min(5, "L'adresse doit contenir au moins 5 caractères"),
});

export const resetPrivatePassword = Yup.object().shape({
  oldPassword: Yup.string().required("l'ancien mot de passe est requis"),
  password: Yup.string()
    .required('Le nouveau mot de passe est requis')
    .min(12, 'le nouveau mot de passe doit contenir 12 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    ),
  confirmPassword: Yup.string()
    .required('ce champ est requis')
    .min(12)
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});
