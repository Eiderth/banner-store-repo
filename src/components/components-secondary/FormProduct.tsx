import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
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

  const [invalid, setInvalid] = useState({
    producto: false,
    costo: false,
    unidades: false,
    porcentaje: false,
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const isInvalid = Object.values(invalid).some((value) => value);

    const isEmptyField =
      !data.producto || !data.costo || !data.unidades || !data.porcentaje;

    setDisabled(isInvalid || isEmptyField);
  }, [invalid, data]);

  const setSetInvalid = (name: string, value: boolean) => {
    setInvalid((prevInvalid) => ({
      ...prevInvalid,
      [name]: value,
    }));
  };

  const handleChangue = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    const lowerName = name.toLowerCase() as keyof formData;
    setSetInvalid(lowerName, false);

    if (type === "checkbox") {
      setData((prevData) => ({ ...prevData, [lowerName]: checked }));
      return;
    }

    if (type === "text") {
      const newValue = value.toUpperCase();
      if (newValue.length > 15 || /[^a-zA-Z ]/.test(newValue)) {
        setSetInvalid(lowerName, true);
      }

      setData((prevData) => ({
        ...prevData,
        [lowerName]: newValue,
      }));
      return;
    }

    if (type === "number") {
      if (lowerName === "costo" || lowerName === "porcentaje") {
        if (!/^\d*\.?\d*$/.test(value)) {
          setSetInvalid(lowerName, true);
        }
        setData((prevData) => ({ ...prevData, [lowerName]: value }));
      }

      if (lowerName === "unidades") {
        if (!/^\d*$/.test(value)) {
          setSetInvalid(lowerName, true);
        }
        setData((prevData) => ({ ...prevData, [lowerName]: value }));
      }
    }
  };

  return (
    <Form title="Formulario de Productos">
      <Input
        name="Producto"
        id="Producto"
        type="text"
        placeholder="Ejemplo: Harina"
        required
        value={data.producto}
        onChange={handleChangue}
        invalid={invalid.producto}
      />
      <Input
        name="Costo"
        id="Costo"
        type="number"
        placeholder="$"
        required
        step="any"
        value={data.costo}
        onChange={handleChangue}
        invalid={invalid.costo}
      />
      <Input
        name="Unidades"
        id="Unidades"
        type="number"
        placeholder="Cantidad de unidades"
        required
        value={data.unidades}
        onChange={handleChangue}
        invalid={invalid.unidades}
      />
      <Input
        name="Porcentaje"
        id="Porcentaje"
        type="number"
        placeholder="%"
        step="any"
        value={data.porcentaje}
        onChange={handleChangue}
        invalid={invalid.porcentaje}
      />
      <Input
        name="Iva"
        id="Iva"
        type="checkbox"
        placeholder="%"
        checked={data.iva}
        onChange={handleChangue}
        className="col-span-full pl-1 gap-2 flex-row items-center mb-5"
        classNameInput="w-auto"
      />
      <Btn
        text="Agregar"
        type="button"
        onClick={() => onClick(data)}
        className="col-span-full disabled:bg-gray-500"
        disabled={disabled}
      />
    </Form>
  );
}
