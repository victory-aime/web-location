import * as Yup from "yup";
import { TYPES } from "../..";

export const manageProductValidation = Yup.object().shape({});

export const initialProductValues: TYPES.MODELS.PRODUCTS.ICreateProduct = {
  articlePrice: "0",
  categoryName: [""],
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
