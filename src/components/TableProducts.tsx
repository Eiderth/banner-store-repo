import { IconArrowLeft } from "@tabler/icons-react";
import type { Data } from "../app-user/components/SectionDashBoard";
import type { Products } from "../types";
type Props = {
  onCLick: () => void;
  data: Data;
  productsSort: Products[];
};

export default function TableProducts({ onCLick, data, productsSort }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow relative overflow-x-auto">
      <button
        className="p-2.5 mb-5 transition rounded-b-sm shadow hover:scale-120"
        onClick={onCLick}
      >
        <IconArrowLeft className="inline" />
        Volver
      </button>
      <h3 className="text-sm text-gray-600 mb-2">Todos los productos</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th className="py-1">Producto</th>
            <th className="py-1">Costo</th>
            <th className="py-1">Ingreso</th>
            <th className="py-1">Ganancia</th>
          </tr>
        </thead>
        <tbody>
          {productsSort.map((product, i) => (
            <tr key={`${product.producto}--${i}`} className="border-t">
              <td className="py-2">{product.producto}</td>
              <td className="py-2">{product.costo}</td>
              <td className="py-2">{product.costo + product.ganancia}</td>
              <td className="py-2">{product.ganancia}</td>
            </tr>
          ))}
        </tbody>

        <tfoot className="border-t h-10">
          <tr className="">
            <td className="py-1">Total</td>
            <td className="py-1">{data.invertido}</td>
            <td className="py-1">{data.ingresos}</td>
            <td className="py-1">{data.ganancias}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
