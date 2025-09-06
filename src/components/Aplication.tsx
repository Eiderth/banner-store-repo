import { useState } from "react";
import Form from "./components-secondary/Form";
import Input from "./components-secondary/Input";
import Banner from "./components-secondary/Banner";
import Btn from "./components-secondary/Btn";

export default function Aplication() {
  const initialFormData = {
    producto: "",
    costo: "",
    unidades: "",
    porcentaje: "",
    iva: false,
  };
  const [formData, setFormData] = useState({
    producto: "",
    costo: "",
    unidades: "",
    porcentaje: "",
    iva: false,
  });
  const [products, setProducts] = useState<any[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name.toLowerCase()]: type === "checkbox" ? checked : value,
    });
  };

  const handleClick = () => {
    const newProduct = {
      ...formData,
      iva: formData.iva ? 0 : "No",
      precio: 0,
    };

    newProduct.precio =
      (parseFloat(formData.costo) / parseFloat(formData.unidades)) *
      (1 + parseFloat(formData.porcentaje) / 100);
    if (formData.iva) {
      newProduct.iva = newProduct.precio * 0.16;
      newProduct.precio += newProduct.iva;
    }
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setFormData(initialFormData);
  };

  const inputs = [
    {
      label: "Nombre del producto",
      type: "text",
      id: "Producto",
      name: "Producto",
      value: formData.producto,
      placeholder: "ejemplo: Harina",
    },
    {
      label: "Costo",
      type: "number",
      id: "Costo",
      name: "Costo",
      value: formData.costo,
      placeholder: "$",
    },
    {
      label: "Unidades",
      type: "number",
      id: "Unidades",
      name: "Unidades",
      value: formData.unidades,
      placeholder: "Indique cuantas unidades",
    },
    {
      label: "Porcentaje a ganar",
      type: "number",
      id: "Porcentaje",
      name: "Porcentaje",
      value: formData.porcentaje,
      placeholder: "%",
    },
    {
      label: "Incluir IVA? (0.16%)",
      type: "checkbox",
      id: "IVA",
      name: "IVA",
      checked: formData.iva,
      className: "pl-2 col-span-full pb-4",
      classNameInput: "w-fit",
    },
  ];

  return (
    <>
      <Form title={"Formulario de app"}>
        {inputs.map((inputProps) => (
          <Input {...inputProps} key={inputProps.id} onChange={onChange} />
        ))}
        <Btn
          text="Agregar producto"
          className="col-span-full"
          type="button"
          onClick={handleClick}
        />
      </Form>
      <Banner
        headers={[...inputs.map((input) => input.name), "Precio"]}
        data={products}
      />
    </>
  );
}
