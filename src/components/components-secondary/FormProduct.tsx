import { useState, type ChangeEvent } from "react";
import Form from "./Form";
import Input from "./Input";
import Btn from "./Btn";

export type TypeFormData = {
  producto: string;
  costo: string;
  unidades: string;
  porcentaje: string;
  iva: boolean;
};

type Props = {
  onClick: (data: TypeFormData) => void;
};

export default function FormProduct({ onClick }: Props) {
  const [data, setData] = useState({
    producto: "",
    costo: "",
    unidades: "",
    porcentaje: "",
    iva: false,
  });

  const handleChangue = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, id, value, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id.toLowerCase()]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Form title="Formulario de Productos">
      <Input
        id="Producto"
        type="text"
        placeholder="Ejemplo: Harina"
        required
        pattern="[a-zA-Z\s]{2,10}"
        onChange={handleChangue}
      />
      <Input
        id="Costo"
        type="number"
        placeholder="$"
        required
        step="any"
        onChange={handleChangue}
      />
      <Input
        id="Unidades"
        type="number"
        placeholder="Cantidad de unidades"
        required
        onChange={handleChangue}
      />
      <Input
        id="Porcentaje"
        type="number"
        placeholder="%"
        step="any"
        onChange={handleChangue}
      />
      <Input
        id="Iva"
        type="checkbox"
        placeholder="%"
        onChange={handleChangue}
        className="col-span-full pl-1 gap-2 flex-row items-center mb-5"
        classNameInput="w-auto"
      />
      <Btn
        text="Agregar"
        type="button"
        onClick={() => onClick(data)}
        className="col-span-full"
      />
    </Form>
  );
}
