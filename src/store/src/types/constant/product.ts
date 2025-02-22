import { createListCollection } from "@chakra-ui/react";

export const productListStatus = createListCollection({
  items: [
    { label: "En Ligne", value: "PUBLISH" },
    { label: "Brouillon", value: "DRAFT" },
    { label: "Desactive", value: "DISABLED" },
  ],
});

const categoriList = createListCollection({
  items: [],
});
