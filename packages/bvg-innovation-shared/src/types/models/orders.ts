import { TYPES } from "../.."

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


export interface IVendorOrderItemDetailDto {
  orderItemId: string;
  quantity: number;
  price: number;
  subTotal: number;


  product: {
    name: string;
    images: string[];
  };

  variant?: {
    id: string;
    name: string;
  };

  user: {
    id: string;
    email: string;
    firstName: string;
    name: string;
    address: string
    phone: string
  };

  status: TYPES.MODELS.PRODUCTS.OrderItemStatus;
  createdAt: string;
}

export interface OrderItemVendorDto {
  orderItemId: string;
  quantity: number;
  price: number;
  subTotal: number;
  product: {
    name: string;
    images: string[];
  };
  variant?: any;
}
export interface IResponseOrderDetail {
  user: {
    id: string;
    name: string;
    firstName: string;
    phone: string;
    email: string;
    address: string;
  };
  status: TYPES.MODELS.PRODUCTS.OrderItemStatus;
  createdAt: string;
  orderItemId?:string
  content: OrderItemVendorDto[];
}

export interface IUpdateOrderDto {
  id: string | null,
  status: TYPES.MODELS.PRODUCTS.OrderItemStatus,
  storeId: string | null
}