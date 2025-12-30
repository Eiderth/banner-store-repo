import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Context } from "../../contexts/Contex";
import useIsMobile from "../../hooks/useIsMobile";

import { IconTrash, IconEdit } from "@tabler/icons-react";
import TableCardDataEditing from "../../components/TableCardDataEditing";
import Btn from "../../components/Btn";

import validate from "../../functions/validate";
import { initialInvalid } from "../../functions/validate";

type Props = {
  id: string;
};

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct, editProducts } = useContext(Context);

  // se crea una copia para manejar mejor los cambios y evitar daño a los demas componentes en caso de errores
  const [copyProps, setCopyProps] = useState(productsProps);

  //useEffect para actualizar el estado de la copia y reiniciar valores
  useEffect(() => {
    setCopyProps(productsProps);
    setIdx(-1);
    setIsInvalid(initialInvalid);
  }, [productsProps]);

  //manejador de click de edicion
  const [idxEditing, setIdx] = useState(-1);
  const handleClick = (i: number) => {
    if (idxEditing != i) {
      setIdx(i);
      return;
    }
    setIdx(-1);
    editProducts(copyProps);
    setDat({ key: "", value: "" });
  };

  //almacenado de Data y validacion
  const [newDat, setDat] = useState({ key: "", value: "" });
  const [isInvalid, setIsInvalid] = useState(initialInvalid);
  const handleChangue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDat({ key: name, value: value });

    setIsInvalid({
      ...isInvalid,
      [name]: validate(name as keyof typeof initialInvalid, value),
    });
  };

  //prevenir que el usuario deje campos vacios o invalidos
  useEffect(() => {
    if (newDat.key == "") return;
    const newProps = [...copyProps];
    const newDate = {
      ...copyProps[idxEditing],
      [newDat.key]: newDat.value.toUpperCase(),
    };
    newProps[idxEditing] = newDate;
    setCopyProps(newProps);
  }, [newDat]);

  const [disabled, setDisabled] = useState(-1);
  useEffect(() => {
    const arrInvalid = Object.values(isInvalid).some((bool) => bool);
    if (arrInvalid) {
      setDisabled(idxEditing);
    } else setDisabled(-1);
  }, [copyProps[idxEditing]]);

  const isMobile = useIsMobile();

  return (
    <section
      id={id}
      className="w-full min-h-[400px] p-2.5 md:p-6 scroll-smooth flex flex-col gap-2"
    >
      <div className="bg-white p-2 rounded-lg shadow overflow-x-auto w-fit px-5">
        <h3 className="text-sm text-gray-600 mb-2">Datos Ingresados</h3>
      </div>
      <div className="bg-white p-2 rounded-lg shadow overflow-x-auto">
        {isMobile ? (
          copyProps.map((product, i) => {
            return (
              <TableCardDataEditing
                key={`producto--${i}`}
                isEditing={idxEditing === i}
                isInvalid={isInvalid}
                values={product}
                handleChangue={handleChangue}
                handleClick={() => handleClick(i)}
                disabled={disabled === i}
                deleteProduct={() => deleteProduct(i)}
              />
            );
          })
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-1 pr-2.5">Producto</th>
                <th className="py-1 pr-2.5">Costo</th>
                <th className="py-1 pr-2.5">Unidades</th>
                <th className="py-1 pr-2.5">Porcentaje</th>
                <th className="py-1 pr-2.5">editar</th>
              </tr>
            </thead>
            <tbody>
              {copyProps.map((product, i) => (
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
                            ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-full"
                            : "outline-0 cursor-auto w-full"
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
                          ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                          : "outline-0 cursor-auto w-full"
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
                          ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                          : "outline-0 cursor-auto w-full"
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
                          ? "hover:outline-2 focus:p-2 hover:p-2 rounded-2xl transition-all w-9/12"
                          : "outline-0 cursor-auto w-full"
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
        )}
      </div>
    </section>
  );
}
