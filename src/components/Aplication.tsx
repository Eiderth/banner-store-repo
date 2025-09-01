import { useRef, useState } from "react";
import Form from "./components-secondary/Form";
import Input from "./components-secondary/Input";
import Banner from "./components-secondary/Banner";
import Btn from "./components-secondary/Btn";

export default function Aplication() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const costoTotalRef = useRef<HTMLInputElement>(null);
  const unidadesRef = useRef<HTMLInputElement>(null);
  const porcentajeRef = useRef<HTMLInputElement>(null);
  const ivaRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<any[]>([]);

  const handleClick = () => {
    const formData = {
      Producto: String(productNameRef.current?.value),
      Costo: Number(costoTotalRef.current?.value),
      Unidades: Number(unidadesRef.current?.value),
      Porcentaje: Number(porcentajeRef.current?.value),
      IVA: ivaRef.current?.checked ? "Sí" : "No",
    };
    setProducts((prevProducts) => [...prevProducts, formData]);
    productNameRef.current!.value = "";
    costoTotalRef.current!.value = "";
    unidadesRef.current!.value = "";
    porcentajeRef.current!.value = "";
    ivaRef.current!.checked = false;
  };

  const inputs = [
    {
      label: "Nombre del producto",
      type: "text",
      id: "Producto",
      name: "Producto",
      placeholder: "ejemplo: Harina",
      ref: productNameRef,
    },
    {
      label: "Costo",
      type: "number",
      id: "Costo",
      name: "Costo",
      placeholder: "$",
      ref: costoTotalRef,
    },
    {
      label: "Unidades",
      type: "number",
      id: "Unidades",
      name: "Unidades",
      placeholder: "Indique cuantas unidades",
      ref: unidadesRef,
    },
    {
      label: "Porcentaje a ganar",
      type: "number",
      id: "Porcentaje",
      name: "Porcentaje",
      placeholder: "%",
      ref: porcentajeRef,
    },
    {
      label: "Incluir IVA? (0.16%)",
      type: "checkbox",
      id: "IVA",
      name: "IVA",
      className: "pl-2 col-span-full pb-4",
      classNameInput: "w-fit",
      ref: ivaRef,
    },
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputs.map((inputProps) => (
          <Input {...inputProps} key={inputProps.id} />
        ))}
        <Btn
          text="Agregar producto"
          className="col-span-full"
          type="button"
          onClick={handleClick}
        />
      </Form>
      <Banner headers={inputs.map((inputs) => inputs.name)} data={products} />
    </>
  );
}
