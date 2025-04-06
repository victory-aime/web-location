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
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryName?: string[] | any;
  status?: any;
  images?: string[] | any[];
  isInWishlist?: boolean;
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

export interface IShoppingStore {
  id?: string;
  name?: string;
  category?: string;
  images?: any[];
  quantity?: number;
  price?: string;
}

export interface IProductState {
  products: IResponseProductList;
  categories?: IProductsCategories[];
  trashList: IResponseProductList;
  publicProducts: IProduct[];
  isLoading: boolean;
  addProduct: boolean;
  updateProduct: boolean;
  deleteProduct: boolean;
  restoreProduct: boolean;
  error: string | null;
}
