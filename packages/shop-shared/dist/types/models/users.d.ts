export interface IStore {
  id?: string | null | undefined
  name?: string | null | undefined
  description?: string | null | undefined
  image?: null
  userId?: string | null | undefined
  createdAt?: string | null | undefined
  updatedAt?: string | null | undefined
  deletedAt?: null
}
export interface shippingAddress {
  id?: string
  street?: string
  city?: string
  country?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}
export interface IUser {
  id?: string
  firstName?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  shippingAddress?: shippingAddress[]
  store?: IStore
}
export interface UserState {
  user: IUser | null
  isLoading: boolean
  addressAction?: boolean
  error: string | null
}
//# sourceMappingURL=users.d.ts.map
