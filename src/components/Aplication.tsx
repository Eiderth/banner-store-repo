import React from "react";
import { useRef } from "react";
import Form from "./components-secondary/Form";
import Input from "./components-secondary/Input";
import PricingBanner from "./components-secondary/PricingBanner";
import Btn from "./components-secondary/Btn";

export default function Aplication() {
  const ref = {
    productNameRef: useRef<HTMLInputElement>(null),
    costoTotalRef: useRef<HTMLInputElement>(null),
    unidadesRef: useRef<HTMLInputElement>(null),
    porcentajeRef: useRef<HTMLInputElement>(null),
    ivaRef: useRef<HTMLInputElement>(null),
  };

  const handleClick = () => {
    const formData = {
      ProductName: ref.productNameRef.current?.value,
      CostoTotal: ref.costoTotalRef.current?.value,
      Unidades: ref.unidadesRef.current?.value,
      Porcentaje: ref.porcentajeRef.current?.value,
      IVA: ref.ivaRef.current?.checked,
    };
    console.log(formData);
  };

  const inputs = [
    <Input
      label="Producto"
      type="text"
      id="Producto"
      name="ProductName"
      placeholder="ejemplo: Harina"
      ref={ref.productNameRef}
    />,
    <Input
      label="Costo"
      type="number"
      id="Costo"
      name="CostoTotal"
      placeholder="$"
      ref={ref.costoTotalRef}
    />,
    <Input
      label="Unidades"
      type="number"
      id="Unidades"
      name="Unidades"
      placeholder="Indique cuantas unidades"
      ref={ref.unidadesRef}
    />,
    <Input
      label="Porcentaje a ganar"
      type="number"
      id="Porcentaje"
      name="Porcentaje"
      placeholder="%"
      ref={ref.porcentajeRef}
    />,
    <Input
      label="Incluir IVA? (0.16%)"
      type="checkbox"
      id="IVA"
      name="IVA"
      className="pl-2 col-span-full pb-4"
      classNameInput="w-fit"
      ref={ref.ivaRef}
    />,
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputs.map((input, index) =>
          React.cloneElement(input as React.ReactElement, { key: index })
        )}
        <Btn
          text="Agregar producto"
          className="col-span-full"
          type="button"
          onClick={handleClick}
        />
      </Form>
      <PricingBanner />
    </>
  );
}
