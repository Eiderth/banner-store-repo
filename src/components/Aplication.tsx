import React from "react";
import Form from "./components-secondary/Form";
import Input from "./components-secondary/Input";
type Props = {};
export default function Aplication({}: Props) {
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
      clases="pl-2 col-span-full"
    />,
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputs.map((input, index) =>
          React.cloneElement(input as React.ReactElement, { key: index })
        )}
      </Form>
    </>
  );
}
