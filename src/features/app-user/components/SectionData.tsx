import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { Context } from "../../../contexts/Contex";
import type { FormData } from "../../../types";
import Btn from "../../../components/Btn";

import { IconTrash, IconEdit } from "@tabler/icons-react";

type Props = {
  id: string;
};
const initialInvalid = {
  producto: false,
  costo: false,
  unidades: false,
  porcentaje: false,
};

const validate = (
  name: keyof Omit<FormData, "precio" | "iva">,
  value: string
): boolean => {
  switch (name) {
    case "producto": {
      const newValue = value.toUpperCase();
      return (
        newValue.length > 20 ||
        /[^a-zA-Z ]/.test(newValue) ||
        newValue.length < 3
      );
    }
    case "costo":
      return !/^\d*\.?\d*$/.test(value) || value === "";

    case "unidades":
      return !/^\d*$/.test(value) || value === "";

    case "porcentaje":
      return !/^\d*\.?\d*$/.test(value) || value === "";
  }
};

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct, editProducts } = useContext(Context);

  const [idxEditing, setIdx] = useState(-1);
  const handleClick = (i: number) => {
    if (idxEditing != i) {
      setIdx(i);
      return;
    }
    setIdx(-1);
  };
  const [newDat, setDat] = useState({ key: "", value: "" });
  const [isInvalid, setIsInvalid] = useState(initialInvalid);
  const handleChangue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDat({ key: name, value: value });

    setIsInvalid({
      ...isInvalid,
      [name]: validate(name as keyof typeof initialInvalid, value),
    });
  }, []);

  useEffect(() => {
    const props = [...productsProps];
    const newProp = {
      ...productsProps[idxEditing],
      [newDat.key]: newDat.value.toUpperCase(),
    };
    props[idxEditing] = newProp;
    editProducts(props);
  }, [newDat]);

  const [disabled, setDisabled] = useState(-1);
  useEffect(() => {
    const arrInvalid = Object.values(isInvalid).some((bool) => bool);
    if (arrInvalid) {
      setDisabled(idxEditing);
    } else setDisabled(-1);
  }, [productsProps[idxEditing]]);
  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth ">
      <div className="bg-white p-4 w- rounded-lg shadow ">
        <table className="w-full text-left text-sm ">
          <thead>
            <tr>
              <th className="py-1">Producto</th>
              <th className="py-1">Costo</th>
              <th className="py-1">Unidades</th>
              <th className="py-1">Porcentaje</th>
              <th className="py-1">editar</th>
            </tr>
          </thead>
          <tbody>
            {productsProps.map((product, i) => (
              <tr
                key={`table-row-${i}`}
                className={`border-t ${idxEditing === i && "bg-green-200"}`}
              >
                <td
                  className={`py-2 pl-2 ${
                    isInvalid.producto && idxEditing === i && "bg-red-400"
                  }`}
                >
                  <input
                    className={`
                      ${
                        idxEditing === i
                          ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                          : "outline-0 cursor-auto"
                      }`}
                    type="text"
                    name="producto"
                    value={product.producto}
                    readOnly={!(idxEditing === i)}
                    onChange={(e) => handleChangue(e)}
                  />
                </td>
                <td
                  className={`py-2 pl-2 ${
                    isInvalid.costo && idxEditing === i && "bg-red-400"
                  }`}
                >
                  <input
                    className={
                      idxEditing === i
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all w-9/12"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="costo"
                    value={product.costo}
                    readOnly={!(idxEditing === i)}
                    onChange={(e) => handleChangue(e)}
                  />
                </td>
                <td
                  className={`py-2 pl-2 ${
                    isInvalid.unidades && idxEditing === i && "bg-red-400"
                  }`}
                >
                  <input
                    className={
                      idxEditing === i
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all w-9/12"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="unidades"
                    value={product.unidades}
                    readOnly={!(idxEditing === i)}
                    onChange={(e) => handleChangue(e)}
                  />
                </td>
                <td
                  className={`py-2 pl-2 ${
                    isInvalid.porcentaje && idxEditing === i && "bg-red-400"
                  }`}
                >
                  <input
                    className={
                      idxEditing === i
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all w-9/12"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="porcentaje"
                    value={product.porcentaje}
                    readOnly={!(idxEditing === i)}
                    onChange={(e) => handleChangue(e)}
                  />
                </td>

                <td className="py-2 flex gap-1">
                  <Btn
                    className={`bg-green-400 ${
                      disabled === i && "bg-gray-400"
                    }`}
                    onClick={() => handleClick(i)}
                    disabled={disabled === i}
                  >
                    <IconEdit></IconEdit>
                  </Btn>
                  <Btn onClick={() => deleteProduct(i)}>
                    <IconTrash />
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
