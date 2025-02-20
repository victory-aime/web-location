export type ProductStatus = "PUBLISH" | "DRAFT" | "DISABLED";

export type ProductImage = {
  url: string;
  isPrimary: boolean;
};

export interface ProductsVariants {
  id?: string | undefined;
  productId?: string | undefined;
  attributes?: object;
  stock?: number;
  price?: number;
}

export interface IProduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryName?: string;
  status?: ProductStatus | string;
  images?: ProductImage[] | string;
  variants?: ProductsVariants[] | string;
}

export interface IResponseProductList {
  content: IProduct[];
  totalPage?: number;
}

export interface IProductState {
  products: IResponseProductList;
  isLoading: boolean;
  addProduct: boolean;
  error: string | null;
}
