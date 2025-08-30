import React from "react";
import Form from "./components-secondary/form/Form";
type Props = {};
export default function Aplication({}: Props) {
  const inputsForm = [
    <input
      type="text"
      placeholder="Producto"
      name="Producto"
      className="bg-gray-500 rounded-2xl p-2.5"
    />,
    <input
      type="number"
      placeholder="Precio"
      name="Precio"
      className="bg-gray-500 rounded-2xl p-2.5"
    />,
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputsForm.map((input, index) =>
          React.cloneElement(input as React.ReactElement, { key: index })
        )}
      </Form>
    </>
  );
}
