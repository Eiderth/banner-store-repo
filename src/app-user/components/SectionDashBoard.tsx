import { useContext, useState, useMemo } from "react";
import DashBoard from "../../components/DashBoard";
import TableProducts from "../../components/TableProducts";
import { Context } from "../../contexts/Contex";
export type Data = { ingresos: number; ganancias: number; invertido: number };
type Props = { id: string };

export default function SectionDashBoard({ id }: Props) {
  const { products } = useContext(Context);

  //funcion para reducir el array de objetos
  const data: Data = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        acc.ingresos += product.ingresos;
        acc.ganancias += product.ganancia_total;
        acc.invertido += product.costo;
        return acc;
      },
      { ingresos: 0, ganancias: 0, invertido: 0 }
    );
  }, [products]);

  //funcion para ordenar el array de mayor ganancia a menor
  const productsMaxValue = useMemo(() => {
    return products.slice().sort((a, b) => {
      return b.ganancia_total - a.ganancia_total;
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
