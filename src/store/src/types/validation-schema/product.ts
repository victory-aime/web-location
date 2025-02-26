import * as Yup from "yup";
import { TYPES } from "../..";

export const manageProductValidation = Yup.object().shape({
  articlePrice: Yup.number()
    .typeError("Le prix de l'article doit être un nombre")
    .min(0, "Le prix de l'article ne peut pas être négatif")
    .required("Le prix de l'article est requis"),

  categoryName: Yup.array()
    .of(Yup.string().required("Le nom de la catégorie est requis"))
    .min(1, "Au moins une catégorie est requise")
    .required("La catégorie est requise"),

  description: Yup.string()
    .min(30, "Le nom du produit doit contenir au moins 30 caractères")
    .max(160, "La description du produit ne peut pas dépasser 160 caractères")
    .optional(),

  images: Yup.array()
    .of(Yup.string().url("Chaque image doit être une URL valide"))
    .optional(),

  name: Yup.string()
    .trim()
    .min(3, "Le nom du produit doit contenir au moins 3 caractères")
    .max(100, "Le nom du produit ne peut pas dépasser 100 caractères")
    .required("Le nom du produit est requis"),

  price: Yup.number()
    .typeError("Le prix doit être un nombre")
    .min(0, "Le prix ne peut pas être négatif")
    .required("Le prix est requis"),

  profit: Yup.number()
    .typeError("Le profit doit être un nombre")
    .min(0, "Le profit ne peut pas être négatif")
    .required("Le profit est requis"),

  profitMargin: Yup.number()
    .typeError("La marge de profit doit être un nombre")
    .min(0, "La marge de profit ne peut pas être négative")
    .required("La marge de profit est requise"),

  status: Yup.array()
    .of(
      Yup.string().oneOf(["DRAFT", "PUBLISHED", "ARCHIVED"], "Statut invalide")
    )
    .min(1, "Au moins un statut est requis")
    .required("Le statut est requis"),

  stock: Yup.number()
    .typeError("Le stock doit être un nombre")
    .min(0, "Le stock ne peut pas être négatif")
    .required("Le stock est requis"),

  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required("Le nom du variant est requis"),
        value: Yup.string().trim().required("La valeur du variant est requise"),
      })
    )
    .optional(),
});

export const initialProductValues: TYPES.MODELS.PRODUCTS.ICreateProduct = {
  articlePrice: "0",
  categoryName: "",
  description: "",
  images: [],
  name: "",
  price: 0,
  profit: "0",
  profitMargin: "0",
  status: ["DRAFT"],
  stock: 0,
  variants: [],
};
