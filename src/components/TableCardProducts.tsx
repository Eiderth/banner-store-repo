import Btn from "./Btn";
import { IconChevronDown } from "@tabler/icons-react";
import type { Products } from "../types";
import { useState } from "react";
type Props = {
  data: Omit<Products, "ingresos_total" & "ganancia_total">;
};

export default function TableCardProducts({ data }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <table className="w-full text-left flex items-center gap-2 text-xs p-2.5 border-t">
        <thead>
          <tr className="flex flex-col">
            <th className="text-nowrap pr-2.5 py-2.5">Producto</th>
            {expanded && (
              <>
                <th className="py-1 text-nowrap pr-2.5">Costo</th>
                <th className="py-1 text-nowrap pr-2.5">Unidades</th>
                <th className="py-1 text-nowrap pr-2.5">Precio B</th>
                <th className="py-1 text-nowrap pr-2.5">Ganancia/U</th>
                <th className="py-1 text-nowrap pr-2.5">Precio Final</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col">
            <td className="pr-2.5 py-2.5">{data.producto}</td>
            {expanded && (
              <>
                <td className="py-1">{data.costo}</td>
                <td className="py-1">{data.unidades}</td>
                <td className="py-1">{data.precio_base}$</td>
                <td className="py-1">+{data.ganancia_unidad}$</td>
                <td className="py-1">{data.precio_final}$</td>
              </>
            )}
          </tr>
        </tbody>
        <Btn
          className="bg-yellow-400 h-fit ml-auto mb-auto"
          onClick={() => setExpanded(!expanded)}
        >
          <IconChevronDown className={`${expanded && "rotate-180"}`} />
        </Btn>
      </table>
    </>
  );
}
