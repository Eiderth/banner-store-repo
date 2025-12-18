import { createContext } from "react";
import type { Products, FormData } from "../types";
type DataContextType = {
  products: Products[];
  productsProps: FormData[];
  editProducts: (FormData: FormData[]) => void;
  addProducts: (data: Omit<FormData, "precio">) => void;
  deleteProduct: (indexToDelete: number) => void;
};

export const Context = createContext<DataContextType>({
  products: [],
  productsProps: [],
  editProducts: () => {},
  addProducts: () => {},
  deleteProduct: () => {},
});
