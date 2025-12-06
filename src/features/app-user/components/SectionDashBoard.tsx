import { useContext, useState, useMemo } from "react";
import DashBoard from "../../../components/DashBoard";
import TableProducts from "../../../components/TableProducts";
import { Context } from "../../../contexts/Contex";
export type Data = { ingresos: number; ganancias: number; invertido: number };
type Props = { id: string };

export default function SectionDashBoard({ id }: Props) {
  const { products } = useContext(Context);
  const data: Data = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const ingreso = product.precio * product.unidades;
        const ganancia = product.ganancia;
        acc.ingresos += ingreso;
        acc.ganancias += ganancia;
        acc.invertido += ingreso - ganancia;
        return acc;
      },
      { ingresos: 0, ganancias: 0, invertido: 0 }
    );
  }, [products]);

  const productsMaxValue = useMemo(() => {
    return products.slice().sort((a, b) => {
      return b.ganancia - a.ganancia;
    });
  }, [products]);

  const [view, setView] = useState(true);
  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth">
      {view ? (
        <DashBoard
          onClick={() => setView(!view)}
          data={data}
          productsSort={productsMaxValue}
        />
      ) : (
        <TableProducts
          onCLick={() => setView(!view)}
          data={data}
          productsSort={productsMaxValue}
        />
      )}
    </section>
  );
}
