import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../../contexts/Contex";

import Btn from "../../../components/Btn";
import { IconTrash, IconEdit } from "@tabler/icons-react";

type Props = {
  id: string;
};

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct } = useContext(Context);

  const initialDat = useMemo(() => {
    return productsProps.map((product) => {
      return {
        ...product,
        isEditing: false,
      };
    });
  }, []);

  const [data, setData] = useState(initialDat);

  const handleClick = (i: number) => {
    const dataEdit = data.map((dat, idx) => {
      if (i != idx) return dat;
      else return { ...dat, isEditing: !dat.isEditing };
    });
    setData(dataEdit);
  };

  useEffect(() => {
    const newDat = productsProps.map((product) => {
      return {
        ...product,
        isEditing: false,
      };
    });
    setData(newDat);
  }, [productsProps]);

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
            {data.map((product, i) => (
              <tr
                key={`table-row-${i}-${product.producto}`}
                className={`border-t ${product.isEditing && "bg-green-200"}`}
              >
                <td key={`table-col-${i}-producto`} className="py-2 pl-2">
                  <input
                    className={
                      product.isEditing
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="text"
                    value={product.producto}
                    readOnly={!product.isEditing}
                  />
                </td>
                <td key={`table-col-${i}-costo`} className="py-2">
                  <input
                    className={
                      product.isEditing
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    value={product.costo}
                    readOnly={!product.isEditing}
                  />
                </td>
                <td key={`table-col-${i}-unidades`} className="py-2">
                  <input
                    className={
                      product.isEditing
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    value={product.unidades}
                    readOnly={!product.isEditing}
                  />
                </td>
                <td key={`table-col-${i}-porcentaje`} className="py-2">
                  <input
                    className={
                      product.isEditing
                        ? "hover:outline-2 hover:p-2 rounded-2xl transition-all"
                        : "outline-0 cursor-auto"
                    }
                    type="number"
                    value={product.porcentaje}
                    readOnly={!product.isEditing}
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

/* <Table
  className="table-fixed"
  data={productsProps}
  nameTable="Edition-Table"
  keysD={[
    "producto",
    "costo",
    "unidades",
    "porcentaje",
    "iva",
    "precio",
  ]}
  onClick={deleteProduct}
  iconOnClick={<IconTrash />}
/> */
