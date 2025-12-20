import { useContext } from "react";

import { Context } from "../../../contexts/Contex";
type Props = { id: string };

export default function SectionCalc({ id }: Props) {
  const { products } = useContext(Context);

  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm text-gray-600 mb-2">Resultados</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="py-1">Producto</th>
              <th className="py-1">Costo</th>
              <th className="py-1">Unidades</th>
              <th className="py-1">Precio base</th>
              <th className="py-1">Ganancia por unidad</th>
              <th className="py-1">Precio Final</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 6).map((product, i) => (
              <tr key={`${product.producto}--${i}`} className="border-t">
                <td className="py-2">{product.producto}</td>
                <td className="py-2">{product.costo}</td>
                <td className="py-2">{product.unidades}</td>
                <td className="py-2">{product.precio_base}$</td>
                <td className="py-2">
                  +{product.ganancia / product.unidades}$
                </td>
                <td className="py-2">{product.precio_final}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
