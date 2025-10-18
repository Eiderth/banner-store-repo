import { useContext } from "react";
import Banner from "../../../components/Banner";
import { Context } from "../../../contexts/Contex";
type Props = {};

export default function SectionCalc({}: Props) {
  const { productsProps, products } = useContext(Context);

  return (
    <section
      className="w-full min-h-full p-3.5 grid grid-cols-2 grid-rows-[1fr_auto_1fr] place-items-center gap-4
    lg:grid-cols-3 lg:grid-rows-2 lg:p-10 lg:gap-10"
    >
      <Banner
        className="col-span-full min-h-60 lg:w-[80%] lg:h-full"
        classNameTable="table-fixed"
        title="Resultados"
        headers={["producto", "precio base", "ganancia", "iva", "precio"]}
        keys={["producto", "precio_base", "ganancia", "iva", "precio"]}
        sign={{ iva: "$" }}
        data={products.map((item) => ({
          ...item,
          ganancia: Number((item.ganancia / item.unidades).toFixed(2)),
        }))}
      />
      <Banner
        className="aspect-square"
        classNameTable="table-fixed"
        title="Precio base"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        className="aspect-square "
        classNameTable="table-fixed"
        title="Iva"
        headers={["producto", "iva"]}
        keys={["producto", "iva"]}
        data={products}
        sign={{ iva: "$" }}
      />
      <Banner
        className="col-span-full rows-3 lg:row-2 lg:col-3 lg:aspect-square"
        classNameTable="table-fixed"
        title="porcentaje"
        headers={["producto", "ganancia"]}
        keys={["producto", "ganancia"]}
        data={products}
        sign={{ ganancia: "$" }}
      />
    </section>
  );
}
