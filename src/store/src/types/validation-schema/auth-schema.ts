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
