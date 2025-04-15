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
  items?: OrderItem[]
}

export interface IResponseStoreListOrder {
  content: any[]
  totalPages?: number
  totalDataPerPage?: number
}

export interface OrdersState {
  orders: IResponseUserListOrders[]
  storeOrderList: IResponseStoreListOrder
  loading: boolean
  orderActions?: boolean
  error: string | null
}
