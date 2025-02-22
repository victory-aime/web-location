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
  stock?: number;
  price?: number;
}

export interface IProduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryName?: string;
  status?: ProductStatus | string[] | string;
  images?: string[] | any[];
  variants?: ProductsVariants[];
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
