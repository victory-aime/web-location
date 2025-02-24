import { AnyAaaaRecord } from "dns";

export type ProductStatus = "PUBLISH" | "DRAFT" | "DISABLED";

export interface ICreateProduct extends IProduct {
  discountPrice?: number;
  articlePrice?: string | number;
  profit?: string | number;
  profitMargin?: string | number;
  storeId?: string;
}

export interface ProductsVariants {
  id?: string | undefined;
  productId?: string | undefined;
  name?: string;
  value?: string;
}

export interface IProduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryName?: string[] | any;
  status?: any;
  images?: string[] | any[];
  variants?: ProductsVariants[];
}

export interface IProductId extends IProduct {
  articlePrice?: string | number;
  profit?: string | number;
  profitMargin?: string | number;
}
export interface IResponseProductList {
  content: IProduct[];
  totalPage?: number;
}

export interface IProductsCategories {
  id?: string;
  name?: string;
}

export interface IProductState {
  products: IResponseProductList;
  categories?: IProductsCategories[];
  isLoading: boolean;
  addProduct: boolean;
  updateProduct?: boolean;
  error: string | null;
}
