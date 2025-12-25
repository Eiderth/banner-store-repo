import {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from "react";
import { Context } from "../../contexts/Contex";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Btn from "../../components/Btn";
import type { ChangeEvent } from "react";
import type { FormData } from "../../types";

import validate from "../../functions/validate";
import { initialInvalid } from "../../functions/validate";

const initialData: FormData = {
  producto: "",
  costo: "",
  unidades: "",
  porcentaje: "",
};

type ActionData =
  | {
      type: "FIELD_SET";
      fieldName: string;
      value: string;
    }
  | { type: "FIELD_RESET" };

const reducerData = (state: FormData, action: ActionData) => {
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
  action: { key: keyof FormData; value: boolean }
) => {
  return {
    ...state,
    [action.key]: action.value,
  };
};

type Props = { id: string };
export default function FormProduct({ id }: Props) {
  //estado de los valores de los inputs
  const [stateData, dispathData] = useReducer(reducerData, initialData);

  //estado invalido de los inputs
  const [stateInvalid, dispathInvalid] = useReducer(
    reducerInvalid,
    initialInvalid
  );

  //estado del boton
  const [disabled, setDisabled] = useState(true);

  //funcion manejadora de cambios (valida y guarda el estado de los inputs)
  const handleChangue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    dispathInvalid({
      key: name as keyof typeof initialInvalid,
      value: validate(name as keyof FormData, value),
    });

    dispathData({
      type: "FIELD_SET",
      fieldName: name,
      value: type === "text" ? value.toUpperCase() : value,
    });
  }, []);

  //useEfect para desactivar el boton cuando se detecte un valor invalido
  useEffect(() => {
    const isInvalid = Object.values(stateInvalid).some((item) => item);

    setDisabled(isInvalid);
  }, [stateData]);

  //useEfect para que la primera vez que cargue el disabled se mantenga en true
  useEffect(() => {
    setTimeout(() => {
      setDisabled(true);
    }, 0);
  }, []);

  // añadir objeto a las props de los productos
  const { addProducts } = useContext(Context);
  const handleClick = useCallback(() => {
    const newState = { ...stateData, producto: stateData.producto.trim() };
    addProducts(newState);
    dispathData({ type: "FIELD_RESET" });
  }, [addProducts, stateData]);

  return (
    <section
      id={id}
      className="w-full h-full flex flex-col items-center justify-center p-2"
    >
      <Form title="Formulario de Productos" className="bg-white">
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
          classNameSpan="md:p-0"
        />
        <Btn
          text="Agregar"
          type="button"
          onClick={handleClick}
          className="col-span-full disabled:bg-gray-500"
          disabled={disabled}
        />
      </Form>
    </section>
  );
}
