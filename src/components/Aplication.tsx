import FormProduct from "./components-secondary/FormProduct";
import SectionData from "./components-secondary/SectionData";
import { useMemo, useCallback, useState } from "react";
import DashBoard from "./components-secondary/DashBoard";
import type { FormData, Products, Links } from "../types";

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
const liElements: Links[] = [
  { li: "Formulario", link: "form" },
  { li: "Datos", link: "data" },
  { li: "Banner", link: "banner" },
];
export default function Aplication() {
  const [productsProps, setProductsProps] = useState<FormData[]>([]);

  const [changueSection, setChangieSection] = useState<
    "form" | "data" | "banner"
  >("form");

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
    <main>
      <nav className="fixed top-1 right-2.5 min-w-[50%] max-w-fit overflow-hidden rounded-full ">
        <DashBoard liElements={liElements} changueSection={setChangieSection} />
      </nav>
      {changueSection === "form" && (
        <section className="max-w-screen min-h-screen p-1 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 place-items-center gap-5">
          <div className="col-span-full">
            <FormProduct onClick={handleClick} />
          </div>
        </section>
      )}
      {changueSection === "data" && (
        <SectionData
          handleDelete={handleDelete}
          products={products}
          productsProps={productsProps}
        />
      )}
      {changueSection === "banner" && <section>Banner Section</section>}
    </main>
  );
}

//Sigue asi campeon vas avanzando
