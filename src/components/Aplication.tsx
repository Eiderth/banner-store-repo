import React from "react";
import Form from "./components-secondary/Form";
import Input from "./components-secondary/Input";
import PricingBanner from "./components-secondary/PricingBanner";
import Btn from "./components-secondary/btn";

export default function Aplication() {
  const handleClick = () => {
    alert("Hola");
  };
  const inputs = [
    <Input
      label="Producto"
      type="text"
      id="Producto"
      placeholder="ejemplo: Harina"
    />,
    <Input label="Costo" type="number" id="Costo" placeholder="$" />,
    <Input
      label="Unidades"
      type="number"
      id="Unidades"
      placeholder="Indique cuantas unidades"
    />,
    <Input
      label="Porcentaje a ganar"
      type="number"
      id="Porcentaje"
      placeholder="%"
    />,
    <Input
      label="Incluir IVA? (0.16%)"
      type="checkbox"
      id="IVA"
      className="pl-2 col-span-full pb-4"
    />,
    <Btn
      text="Agregar producto"
      onClick={handleClick}
      className="col-span-full"
      type="button"
    />,
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputs.map((input, index) =>
          React.cloneElement(input as React.ReactElement, { key: index })
        )}
      </Form>
      <PricingBanner />
    </>
  );
}
