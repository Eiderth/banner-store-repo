import Banner from "./components-secondary/Banner";
import FormProduct from "./components-secondary/FormProduct";

import { useState } from "react";
import type { formData } from "./components-secondary/FormProduct";

export type products = formData & { precio: string };

export default function Aplication() {
  const [product, setProduct] = useState<products[]>([]);

  const handleClick = (data: formData) => {
    let { costo, unidades, porcentaje, iva } = data;
    const numCosto = Number(costo);
    const numUnidades = Number(unidades);
    const numPorcentaje = Number(porcentaje) / 100;

    let precio = (numCosto / numUnidades) * (numPorcentaje + 1);
    iva ? (precio += precio * 0.16) : precio;

    setProduct((prevProduct) => [
      ...prevProduct,
      { ...data, precio: precio.toString() },
    ]);
    console.log(product);
  };

  return (
    <>
      <FormProduct onClick={handleClick} />
      <Banner
        headers={[
          "producto",
          "costo",
          "unidades",
          "porcentaje",
          "iva",
          "precio",
        ]}
        data={product}
      />
    </>
  );
}

//Sigue asi campeon vas avanzando
