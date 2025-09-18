import Banner from "./components-secondary/Banner";
import FormProduct from "./components-secondary/FormProduct";
import { useMemo, useCallback, useState } from "react";

import type { formData } from "./components-secondary/FormProduct";

export type products = {
  producto: string;
  costo: number;
  unidades: number;
  porcentaje: number;
  iva: number;
  precio: number;
};

export default function Aplication() {
  const [productsProps, setProductsProps] = useState<formData[]>([]);

  const handleClick = useCallback((data: formData) => {
    setProductsProps((prevProduct) => [...prevProduct, data]);
  }, []);
  const products = useMemo(
    () =>
      productsProps.map((item) => ({
        producto: item.producto,
        costo: Number(item.costo),
        unidades: Number(item.unidades),
        porcentaje: Number(
          (Number(item.costo) * (Number(item.porcentaje) / 100)).toFixed(2)
        ),
        iva: item.iva
          ? Number(
              (
                ((Number(item.costo) * (Number(item.porcentaje) / 100 + 1)) /
                  Number(item.unidades)) *
                0.16
              ).toFixed(2)
            )
          : 0,
        precio:
          (Number(item.costo) * (Number(item.porcentaje) / 100 + 1)) /
          Number(item.unidades),
      })),
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
        data={productsProps}
        onDelete={handleDelete}
      />
      <Banner
        title="Porcentaje"
        headers={["producto", "porcentaje"]}
        data={products}
        sign={{ porcentaje: "$" }}
      />
      <Banner
        title="Precio base"
        headers={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        title="Iva"
        headers={["producto", "iva"]}
        data={products}
        sign={{ iva: "$" }}
      />
      <Banner
        className="col-span-full"
        title="Preio Final"
        headers={["producto", "costo", "porcentaje", "iva", "precio"]}
        data={products}
        // sign={{ iva: "$" }}
      />
    </section>
  );
}

//Sigue asi campeon vas avanzando
//Recordar añadir  propiedad precio base y ganacias
