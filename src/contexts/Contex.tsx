import { createContext } from "react";
import type { Products, FormData } from "../types";
type DataContextType = {
  products: Products[];
  productsProps: FormData[];
  setProductsProps: (data: Omit<FormData, "precio">) => void;
  deleteProduct: (indexToDelete: number) => void;
};

export const Context = createContext<DataContextType>({
  products: [],
  productsProps: [],
  setProductsProps: () => {},
  deleteProduct: () => {},
});
