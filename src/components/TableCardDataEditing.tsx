import Btn from "./Btn";
import { IconChevronDown, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState, type ChangeEvent } from "react";
import { initialInvalid } from "../functions/validate";
import type { FormData } from "../types";
type Props = {
  isEditing: boolean;
  isInvalid: typeof initialInvalid;
  values: FormData;
  handleChangue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  disabled: boolean;
  deleteProduct: () => void;
};

export default function TableCardDataEditing({
  isEditing,
  isInvalid,
  values,
  handleChangue,
  handleClick,
  disabled,
  deleteProduct,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <table className="w-full text-left text-sm flex items-center gap-2 p-2.5 border-t">
      <thead>
        <tr className="flex flex-col">
          <th className="py-1 pr-2.5">Producto</th>
          {expanded && (
            <>
              <th className="py-1 pr-2.5">Costo</th>
              <th className="py-1 pr-2.5">Unidades</th>
              <th className="py-1 pr-2.5">Porcentaje</th>
              <th className="py-3 pr-2.5">editar</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <tr className={`flex flex-col ${isEditing && "bg-green-200"}`}>
          <td
            className={`py-1 ${
              isInvalid.producto && isEditing && "bg-red-400"
            }`}
          >
            <input
              className={`
                        ${
                          isEditing
                            ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-full"
                            : "outline-0 cursor-auto w-full"
                        }`}
              type="text"
              name="producto"
              value={values.producto}
              readOnly={!isEditing}
              onChange={(e) => handleChangue(e)}
            />
          </td>
          {expanded && (
            <>
              <td
                className={`py-1 ${
                  isInvalid.costo && isEditing && "bg-red-400"
                }`}
              >
                <input
                  className={
                    isEditing
                      ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                      : "outline-0 cursor-auto w-full"
                  }
                  type="number"
                  name="costo"
                  value={values.costo}
                  readOnly={!isEditing}
                  onChange={(e) => handleChangue(e)}
                />
              </td>
              <td
                className={`py-1 ${
                  isInvalid.unidades && isEditing && "bg-red-400"
                }`}
              >
                <input
                  className={
                    isEditing
                      ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                      : "outline-0 cursor-auto w-full"
                  }
                  type="number"
                  name="unidades"
                  value={values.unidades}
                  readOnly={!isEditing}
                  onChange={(e) => handleChangue(e)}
                />
              </td>
              <td
                className={`py-1 ${
                  isInvalid.porcentaje && isEditing && "bg-red-400"
                }`}
              >
                <input
                  className={
                    isEditing
                      ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                      : "outline-0 cursor-auto w-full"
                  }
                  type="number"
                  name="porcentaje"
                  value={values.porcentaje}
                  readOnly={!isEditing}
                  onChange={(e) => handleChangue(e)}
                />
              </td>

              <td className="py-1 flex gap-1">
                <Btn
                  className={`bg-green-400 w-fit h-fit p-2 ${
                    disabled && "bg-gray-400"
                  }`}
                  onClick={() => handleClick()}
                  disabled={disabled}
                >
                  <IconEdit></IconEdit>
                </Btn>
                <Btn
                  className="w-fit h-fit p-2"
                  onClick={() => deleteProduct()}
                >
                  <IconTrash />
                </Btn>
              </td>
            </>
          )}
        </tr>
      </tbody>
      <Btn
        className="bg-yellow-400 h-fit w-fit ml-auto mb-auto"
        onClick={() => setExpanded(!expanded)}
      >
        <IconChevronDown className={`${expanded && "rotate-180"}`} />
      </Btn>
    </table>
  );
}
