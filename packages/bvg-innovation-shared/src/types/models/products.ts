export type ProductStatus = 'PUBLISH' | 'DISABLED' | 'DRAFT'
export type OrderStatus = 'NEW' | 'IN_PROGRESS' | 'CANCELED' | 'PAID' | 'DELIVERED'

export interface ICreateProduct extends IProduct {
  discountPrice?: number
  articlePrice?: string | number
  profit?: string | number
  profitMargin?: string | number
  storeId?: string
}

export interface ProductsVariants {
  id?: string | undefined
  productId?: string | undefined
  name?: string
  value?: string
}

export interface IProduct {
  id?: string
  name?: string
  description?: string
  price?: number
  stock?: number
  categoryName?: string[] | any
  status?: any
  images?: string[] | any[]
  isInWishlist?: boolean
  variants?: ProductsVariants[]
}

export interface IProductId extends IProduct {
  articlePrice?: string | number
  profit?: string | number
  profitMargin?: string | number
}
export interface IResponseProductList {
  content: IProduct[]
  totalPage?: number
}

export interface IProductsCategories {
  id?: string
  name?: string
}

export interface IStatusOrder {
  label?: string
  value?: OrderStatus
}

export interface IProductStatus {
  label?: string
  value?: ProductStatus
}

export interface IShoppingStore {
  id?: string
  name?: string
  category?: string
  images?: any[]
  quantity?: number
  price?: string
}

export interface IProductState {
  categories?: IProductsCategories[]
  trashList: IResponseProductList
}

export interface ICreateProductPayload extends IProduct {}

export interface IGetAllPublicProductsPayload {
  page?: number
  pageSize?: number
  userId?: string
  productId?: string
  categories?: string[]
  minPrice?: number
  maxPrice?: number
  productTitle?: string
}

export interface IGetAllPublicProductsResponse {
  content: IProduct[]
  totalPages: number
  totalDataPerPage: number
  currentPage: number
}

export interface IPrivateProductResponse {
  content: IProduct[]
  totalPage?: number
  totalDataPerPage: number
  currentPage: number
}
