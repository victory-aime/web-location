export interface OrderItemDto {
  productId?: string
  quantity?: number
  price?: number
  storeId?: string
  variantId?: string | null
}

export interface CreateOrderDto {
  total?: number
  userId?: string
  orderItems?: OrderItemDto[]
}

interface IProductOrder {
  productId: string
  name: string
  image: string
  productPrice: string
}

interface OrderItem {
  orderItemId: string
  product: IProductOrder
  store: {
    id: string
    name: string
  }
  quantity: number | string
  price: string | number
}

export interface IResponseUserListOrders {
  orderId?: string
  total?: string
  status?: string
  createdAt?: string
  items?: OrderItem[]
}

export interface IResponseListOrder {
  content: IResponseUserListOrders[]
  totalPages?: number
  currentPage?: number
  totalDataPerPage?: number
}
