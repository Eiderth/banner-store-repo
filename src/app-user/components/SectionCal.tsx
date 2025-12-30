import { useContext } from "react";
import { Context } from "../../contexts/Contex";
import useIsMobile from "../../hooks/useIsMobile";
import TableCard from "../../components/TableCard";
type Props = { id: string };

export default function SectionCalc({ id }: Props) {
  const { products } = useContext(Context);

  const isMobile = useIsMobile();
  return (
    <section
      id={id}
      className="w-full min-h-[400px] p-2.5 md:p-6 scroll-smooth flex flex-col gap-2"
    >
      <div className="bg-white p-2 rounded-lg shadow overflow-x-auto w-fit px-5">
        <h3 className="text-sm text-gray-600 mb-2">Resultados</h3>
      </div>
      <div className="bg-white p-2 rounded-lg shadow overflow-x-auto">
        {isMobile ? (
          products.map((product, i) => {
            return (
              <TableCard
                data={product}
                headers={[
                  "Producto",
                  "Costo",
                  "Unidades",
                  "Precio Base",
                  "Ganancia/unidad",
                  "Precio Final",
                ]}
                keys={[
                  "producto",
                  "costo",
                  "unidades",
                  "precio_base",
                  "ganancia_unidad",
                  "precio_final",
                ]}
                rowView={1}
                signs={["", "$", "", "$", "$", "$"]}
                key={`producto--${i}`}
              />
            );
          })
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-1 text-nowrap pr-2.5">Producto</th>
                <th className="py-1 text-nowrap pr-2.5">Costo</th>
                <th className="py-1 text-nowrap pr-2.5">Unidades</th>
                <th className="py-1 text-nowrap pr-2.5">Precio base</th>
                <th className="py-1 text-nowrap pr-2.5">Ganancia por unidad</th>
                <th className="py-1 text-nowrap pr-2.5">Precio Final</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={`${product.producto}--${i}`} className="border-t">
                  <td className="py-2">{product.producto}</td>
                  <td className="py-2">{product.costo}</td>
                  <td className="py-2">{product.unidades}</td>
                  <td className="py-2">{product.precio_base}$</td>
                  <td className="py-2">+{product.ganancia_unidad}$</td>
                  <td className="py-2">{product.precio_final}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
