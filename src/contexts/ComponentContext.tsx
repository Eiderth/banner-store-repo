import { useCallback, useMemo, useState, useEffect } from "react";
import { Context } from "./Contex";
import type { Products, FormData } from "../types";

function calculateProductMetrics(item: FormData): Products {
  const costoNum = Number(item.costo);
  const unidadesNum = Number(item.unidades);
  const porcentajeNum = Number(item.porcentaje) / 100;
  const precio_base = Number(item.precio);

  let precioPorUnidad = Number(
    ((costoNum * (1 + porcentajeNum)) / unidadesNum).toFixed(2)
  );
  const ganancia = Number((costoNum * porcentajeNum).toFixed(2));
  const iva = item.iva
    ? Number(
        (((costoNum * (1 + porcentajeNum)) / unidadesNum) * 0.16).toFixed(2)
      )
    : 0;
  precioPorUnidad += iva;
  return {
    producto: item.producto,
    costo: costoNum,
    unidades: unidadesNum,
    ganancia,
    iva,
    precio_base,
    precio: precioPorUnidad,
  };
}

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

  const SetProducts = useCallback((data: Omit<FormData, "precio">) => {
    const newData: FormData = {
      ...data,
      precio: (Number(data.costo) / Number(data.unidades)).toFixed(2),
    };
    setProductsProps((prevProduct) => [...prevProduct, newData]);
  }, []);

  const products: Products[] = useMemo(
    () => productsProps.map(calculateProductMetrics),
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
        setProductsProps: SetProducts,
        deleteProduct: handleDelete,
      }}
    >
      {children}
    </Context.Provider>
  );
}
