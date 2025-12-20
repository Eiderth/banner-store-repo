import { useCallback, useMemo, useState, useEffect } from "react";
import { Context } from "./Contex";
import type { Products, FormData } from "../types";
import calculateMetrics from "../functions/calculateMetrics";

export default function ComponentContext({
  children,
}: {
  children: React.ReactNode;
}) {
  //estado principal de las props
  const [productsProps, setProductsProps] = useState<FormData[]>(() => {
    try {
      const props = localStorage.getItem("props");
      return props ? JSON.parse(props) : [];
    } catch (error) {
      return [];
    }
  });

  //funcion para añadir nuevas props
  const addProducts = useCallback((data: FormData) => {
    setProductsProps((prevProduct) => [...prevProduct, data]);
  }, []);

  //funcion que calcula los datos del producto mediante las props y la funcion calculateMetrics
  const products: Products[] = useMemo(
    () => productsProps.map(calculateMetrics),
    [productsProps]
  );

  //funcion para eliminar un objeto prop del array props y a su vez eliminara un producto
  const handleDelete = useCallback((indexToDelete: number) => {
    setProductsProps((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToDelete)
    );
  }, []);

  //useEfect para guardar el array de props en localStorage
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
