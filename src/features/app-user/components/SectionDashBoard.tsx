import { useContext, useState, useMemo } from "react";
import DashBoard from "../../../components/DashBoard";
import TableProducts from "../../../components/TableProducts";
import { Context } from "../../../contexts/Contex";
export type Data = { ingresos: number; ganancias: number; invertido: number };
type Props = { id: string };

export default function SectionDashBoard({ id }: Props) {
  const { products } = useContext(Context);

  //funcion para reducir el array de objetos
  const data: Data = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const ingreso = product.precio_final * product.unidades;
        const ganancia = product.ganancia;
        acc.ingresos += ingreso;
        acc.ganancias += ganancia;
        acc.invertido += ingreso - ganancia;
        return acc;
      },
      { ingresos: 0, ganancias: 0, invertido: 0 }
    );
  }, [products]);

  //funcion para ordenar el array de mayor ganancia a menor
  const productsMaxValue = useMemo(() => {
    return products.slice().sort((a, b) => {
      return b.ganancia - a.ganancia;
    });
  }, [products]);

  //estado para hacer visible al componente TableProducts
  const [viewTable, setViewTable] = useState(true);
  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth">
      {viewTable ? (
        <DashBoard
          onClick={() => setViewTable(!viewTable)}
          data={data}
          productsSort={productsMaxValue}
        />
      ) : (
        <TableProducts
          onCLick={() => setViewTable(!viewTable)}
          data={data}
          productsSort={productsMaxValue}
        />
      )}
    </section>
  );
}
