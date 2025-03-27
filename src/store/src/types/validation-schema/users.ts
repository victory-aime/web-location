export interface userInitialValues {
  id?: string;
  street: string;
  country: string;
  city: string;
}

export const initialValues: userInitialValues = {
  id: "",
  city: "",
  country: "",
  street: "",
};
