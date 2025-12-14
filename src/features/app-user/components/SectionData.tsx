import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { Context } from "../../../contexts/Contex";
// import type { FormData } from "../../../types";
import Btn from "../../../components/Btn";

import { IconTrash, IconEdit } from "@tabler/icons-react";

type Props = {
  id: string;
};
// const initialInvalid = {
//   producto: false,
//   costo: false,
//   unidades: false,
//   porcentaje: false,
// };

// const validate = (
//   name: keyof Omit<FormData, "precio" | "iva">,
//   value: string
// ): boolean => {
//   switch (name) {
//     case "producto": {
//       const newValue = value.toUpperCase();
//       return newValue.length > 20 || /[^a-zA-Z ]/.test(newValue);
//     }
//     case "costo":
//       return !/^\d*\.?\d*$/.test(value);

//     case "unidades":
//       return !/^\d*$/.test(value);

//     case "porcentaje":
//       return !/^\d*\.?\d*$/.test(value);
//   }
// };

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct, editProducts } = useContext(Context);
  const [isEditing, setIsEditing] = useState(
    new Array(productsProps.length).fill(false)
  );

  const handleClick = (i: number) => {
    setIsEditing(
      isEditing.map((bool, idx) => {
        if (i === idx) return !bool;
        return bool;
      })
    );
  };

  useEffect(() => {
    setIsEditing(new Array(productsProps.length).fill(false));
  }, [productsProps.length]);

  const handleChangue = useCallback(
    (e: ChangeEvent<HTMLInputElement>, idx: number) => {
      const { name, value } = e.target;

      const props1 = [...productsProps];
      const props2 = { ...productsProps[idx], [name]: value };
      props1[idx] = props2;
      editProducts(props1);
    },
    []
  );
  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth">
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left text-sm">
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
                className={`border-t ${isEditing[i] && "bg-green-200"}`}
              >
                <td key={`table-col-${i}-producto`} className="py-2 pl-2">
                  <input
                    className={`
                      ${
                        isEditing[i]
                          ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                          : "outline-0 cursor-auto"
                      }`}
                    type="text"
                    name="producto"
                    value={product.producto}
                    readOnly={!isEditing[i]}
                    onChange={(e) => handleChangue(e, i)}
                  />
                </td>
                <td key={`table-col-${i}-costo`} className="py-2">
                  <input
                    className={
                      isEditing[i]
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="costo"
                    value={product.costo}
                    readOnly={!isEditing[i]}
                    onChange={(e) => handleChangue(e, i)}
                  />
                </td>
                <td key={`table-col-${i}-unidades`} className="py-2">
                  <input
                    className={
                      isEditing[i]
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="unidades"
                    value={product.unidades}
                    readOnly={!isEditing[i]}
                    onChange={(e) => handleChangue(e, i)}
                  />
                </td>
                <td key={`table-col-${i}-porcentaje`} className="py-2">
                  <input
                    className={
                      isEditing[i]
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    name="porcentaje"
                    value={product.porcentaje}
                    readOnly={!isEditing[i]}
                    onChange={(e) => handleChangue(e, i)}
                  />
                </td>

                <td key={`table-col-${i}-delet`} className="py-2 flex gap-1">
                  <Btn className="bg-green-400" onClick={() => handleClick(i)}>
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
