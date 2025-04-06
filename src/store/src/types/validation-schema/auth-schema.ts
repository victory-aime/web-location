import * as Yup from "yup";

export const resetPrivatePassword = Yup.object().shape({
  oldPassword: Yup.string().required("l'ancien mot de passe est requis"),
  password: Yup.string()
    .required("Le nouveau mot de passe est requis")
    .min(12, "le nouveau mot de passe doit contenir 12 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
    ),
  confirmPassword: Yup.string()
    .required("ce champ est requis")
    .min(12)
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
});

export const registerUserValidation = Yup.object().shape({
  name: Yup.string().required("Le nom est requis"),
  firstName: Yup.string().required("Le prénom est requis"),
  email: Yup.string()
    .email("Veuillez saisir une adresse email valide")
    .required("L'email est requis"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "Veuillez saisir un numéro de téléphone valide")
    .required("Le numéro de téléphone est requis"),
  password: Yup.string()
    .min(12, "Le mot de passe doit contenir au moins 12 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
      "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
    )
    .required("Le mot de passe est requis"),
  address: Yup.string().required("Votre adresse est requise"),
  terms: Yup.boolean().oneOf(
    [true],
    "Vous devez accepter les termes et conditions"
  ),
});
