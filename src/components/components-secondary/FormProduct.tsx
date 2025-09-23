import { useState, useEffect, useCallback, useReducer } from "react";
import type { ChangeEvent } from "react";
import type { FormData } from "../../types";
import Form from "./Form";
import Input from "./Input";
import Btn from "./Btn";

const initialData: Omit<FormData, "precio"> = {
  producto: "",
  costo: "",
  unidades: "",
  porcentaje: "",
  iva: false,
};
const initialInvalid = {
  producto: false,
  costo: false,
  unidades: false,
  porcentaje: false,
};

type ActionData =
  | {
      type: "FIELD_SET";
      fieldName: string;
      value: string | boolean;
    }
  | { type: "FIELD_RESET" };

const reducerData = (state: Omit<FormData, "precio">, action: ActionData) => {
  switch (action.type) {
    case "FIELD_SET": {
      return { ...state, [action.fieldName]: action.value };
    }
    case "FIELD_RESET": {
      return initialData;
    }
  }
};
const reducerInvalid = (
  state: typeof initialInvalid,
  action: { key: keyof typeof initialInvalid; value: string | boolean }
) => {
  return {
    ...state,
    [action.key]: action.value,
  };
};
const validate = (
  name: keyof Omit<FormData, "precio" | "iva">,
  value: string
): boolean => {
  switch (name) {
    case "producto": {
      const newValue = value.toUpperCase();
      return newValue.length > 20 || /[^a-zA-Z ]/.test(newValue);
    }
    case "costo":
      return !/^\d*\.?\d*$/.test(value);

    case "unidades":
      return !/^\d*$/.test(value);

    case "porcentaje":
      return !/^\d*\.?\d*$/.test(value);
  }
};

type Props = {
  onClick: (data: Omit<FormData, "precio">) => void;
};

export default function FormProduct({ onClick }: Props) {
  const [stateData, dispathData] = useReducer(reducerData, initialData);

  const [stateInvalid, dispathInvalid] = useReducer(
    reducerInvalid,
    initialInvalid
  );

  const [disabled, setDisabled] = useState(true);

  const handleChangue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      dispathData({ type: "FIELD_SET", fieldName: name, value: checked });
      return;
    }

    dispathInvalid({
      key: name as keyof typeof initialInvalid,
      value: validate(name as keyof Omit<FormData, "precio" | "iva">, value),
    });

    dispathData({
      type: "FIELD_SET",
      fieldName: name,
      value: type === "text" ? value.toUpperCase() : value,
    });
  }, []);

  useEffect(() => {
    const isInvalid = Object.values(stateInvalid).some((item) => item);

    const emptyField =
      !stateData.producto ||
      !stateData.costo ||
      !stateData.unidades ||
      !stateData.porcentaje;

    setDisabled(isInvalid || emptyField);
  }, [stateData]);

  const handleClick = useCallback(() => {
    const newState = { ...stateData, producto: stateData.producto.trim() };
    onClick(newState);
    dispathData({ type: "FIELD_RESET" });
  }, [onClick, stateData]);

  return (
    <Form title="Formulario de Productos">
      <Input
        label="Producto"
        name="producto"
        id="producto"
        type="text"
        placeholder="Ejemplo: Harina"
        required
        value={stateData.producto}
        onChange={handleChangue}
        invalid={stateInvalid.producto}
      />
      <Input
        label="Costo Total"
        name="costo"
        id="costo"
        type="number"
        placeholder="$"
        required
        step="any"
        value={stateData.costo}
        onChange={handleChangue}
        invalid={stateInvalid.costo}
      />
      <Input
        label="Cant Unidades"
        name="unidades"
        id="unidades"
        type="number"
        placeholder="Cantidad de unidades"
        required
        value={stateData.unidades}
        onChange={handleChangue}
        invalid={stateInvalid.unidades}
      />
      <Input
        label="Porcentaje de Ganancia"
        name="porcentaje"
        id="porcentaje"
        type="number"
        placeholder="%"
        step="any"
        value={stateData.porcentaje}
        onChange={handleChangue}
        invalid={stateInvalid.porcentaje}
      />
      <Input
        label="Iva"
        name="iva"
        id="iva"
        type="checkbox"
        placeholder="%"
        checked={stateData.iva}
        onChange={handleChangue}
        className="col-span-full pl-1 gap-2 flex-row items-center mb-5"
        classNameInput="w-auto"
      />
      <Btn
        text="Agregar"
        type="button"
        onClick={handleClick}
        className="col-span-full disabled:bg-gray-500"
        disabled={disabled}
      />
    </Form>
  );
}
