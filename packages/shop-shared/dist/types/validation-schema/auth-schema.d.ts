import * as Yup from 'yup'
export declare const resetPrivatePassword: Yup.ObjectSchema<
  {
    oldPassword: string
    password: string
    confirmPassword: string
  },
  Yup.AnyObject,
  {
    oldPassword: undefined
    password: undefined
    confirmPassword: undefined
  },
  ''
>
export declare const registerUserValidation: Yup.ObjectSchema<
  {
    name: string
    firstName: string
    email: string
    phone: string
    password: string
    address: string
    terms: boolean | undefined
  },
  Yup.AnyObject,
  {
    name: undefined
    firstName: undefined
    email: undefined
    phone: undefined
    password: undefined
    address: undefined
    terms: undefined
  },
  ''
>
//# sourceMappingURL=auth-schema.d.ts.map
