import { useCallback, useMemo, useState, useEffect } from "react";
import { Context } from "./Contex";
import type { Products, FormData } from "../types";
import calculateMetrics from "../functions/calculateMetrics";

export default function ComponentContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productsProps, setProductsProps] = useState<FormData[]>(() => {
    try {
      const props = localStorage.getItem("props");
      return props ? JSON.parse(props) : [];
    } catch (error) {
      return [];
    }
  });

  const addProducts = useCallback((data: FormData) => {
    setProductsProps((prevProduct) => [...prevProduct, data]);
  }, []);

  const products: Products[] = useMemo(
    () => productsProps.map(calculateMetrics),
    [productsProps]
  );

  const handleDelete = useCallback((indexToDelete: number) => {
    setProductsProps((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToDelete)
    );
  }, []);

  useEffect(() => {
    const DataJsonProps = JSON.stringify(productsProps);
    localStorage.setItem("props", DataJsonProps);
  }, [productsProps]);

  return (
    <Context.Provider
      value={{
        products,
        productsProps,
        editProducts: setProductsProps,
        addProducts: addProducts,
        deleteProduct: handleDelete,
      }}
    >
      {children}
    </Context.Provider>
  );
}
