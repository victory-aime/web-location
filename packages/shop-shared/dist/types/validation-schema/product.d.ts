import * as Yup from 'yup'
import { TYPES } from '../..'
export declare const manageProductValidation: Yup.ObjectSchema<
  {
    articlePrice: number
    categoryName: string[]
    description: string | undefined
    images: (string | undefined)[] | undefined
    name: string
    price: number
    profit: number
    profitMargin: number
    status: (string | undefined)[]
    stock: number
    variants:
      | {
          name: string
          value: string
        }[]
      | undefined
  },
  Yup.AnyObject,
  {
    articlePrice: undefined
    categoryName: ''
    description: undefined
    images: ''
    name: undefined
    price: undefined
    profit: undefined
    profitMargin: undefined
    status: ''
    stock: undefined
    variants: ''
  },
  ''
>
export declare const initialProductValues: TYPES.MODELS.PRODUCTS.ICreateProduct
//# sourceMappingURL=product.d.ts.map
