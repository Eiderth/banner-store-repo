import { useState, type ChangeEvent } from "react";
import Form from "./Form";
import Input from "./Input";
import Btn from "./Btn";

export type formData = {
  producto: string;
  costo: string;
  unidades: string;
  porcentaje: string;
  iva: boolean;
};

type Props = {
  onClick: (data: formData) => void;
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

    // recordar agregar validacion en handleChange

    setData((prevData) => ({
      ...prevData,
      [id.toLowerCase()]: type === "checkbox" ? checked : value,
    }));
  };

  const validation = () => {
    let key: keyof formData;
    for (key in data) {
      if (typeof data[key] !== "boolean" && data[key] === "") {
        return true;
      } else if (key === "producto" && data[key].length < 3) {
        return true;
      } else if (Number(data[key]) < 0) return true;
    }
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
        className="col-span-full disabled:bg-gray-500"
        disabled={validation()}
      />
    </Form>
  );
}
