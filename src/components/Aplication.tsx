import Banner from "./components-secondary/Banner";
import FormProduct from "./components-secondary/FormProduct";

import { useState } from "react";
import type { TypeFormData } from "./components-secondary/FormProduct";

type typeProducts = {
  precio: number;
} & TypeFormData;

export default function Aplication() {
  const [product, setProduct] = useState<typeProducts[]>([]);

  const handleClick = (data: TypeFormData) => {
    let { costo, unidades, porcentaje, iva } = data;
    const numCosto = Number(costo);
    const numUnidades = Number(unidades);
    const numPorcentaje = Number(porcentaje) / 100;

    let precio = (numCosto / numUnidades) * (numPorcentaje + 1);
    iva ? (precio += precio * 0.16) : precio;

    setProduct((prevProduct) => [...prevProduct, { ...data, precio: precio }]);
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
      />
    </>
  );
}

//Sigue asi campeon vas avanzando
