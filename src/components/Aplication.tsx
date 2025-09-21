import Banner from "./components-secondary/Banner";
import FormProduct from "./components-secondary/FormProduct";
import { useMemo, useCallback, useState } from "react";

import type { FormData, Products } from "../types";

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

export default function Aplication() {
  const [productsProps, setProductsProps] = useState<FormData[]>([]);

  const handleClick = useCallback((data: Omit<FormData, "precio">) => {
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

  return (
    <section className="max-w-screen min-h-screen p-1 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 place-items-center gap-5">
      <div className="col-span-full">
        <FormProduct onClick={handleClick} />
      </div>
      <Banner
        className="p-1 col-span-full max-w-full"
        classNameTable="border-spacing-1"
        title="Datos"
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        data={productsProps}
        onDelete={handleDelete}
      />
      <Banner
        title="porcentaje"
        headers={["producto", "ganancia"]}
        keys={["producto", "ganancia"]}
        data={products}
        sign={{ ganancia: "$" }}
      />
      <Banner
        title="Iva"
        headers={["producto", "iva"]}
        keys={["producto", "iva"]}
        data={products}
        sign={{ iva: "$" }}
      />
      <Banner
        title="Precio base"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        title="Precio final"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        sign={{ precio: "$$" }}
      />
      <Banner
        className="col-span-full"
        title="Preio Final"
        headers={["producto", "precio base", "ganancia", "iva", "precio"]}
        keys={["producto", "precio_base", "ganancia", "iva", "precio"]}
        sign={{ iva: "$" }}
        data={products.map((item) => ({
          ...item,
          ganancia: Number((item.ganancia / item.unidades).toFixed(2)),
        }))}
      />
    </section>
  );
}

//Sigue asi campeon vas avanzando
