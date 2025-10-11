import { useDataContext } from "../../../contexts/DataContext";
import Banner from "../../../components/Banner";
type Props = {};

export default function SectionCalc({}: Props) {
  const { productsProps, products } = useDataContext();

  return (
    <section className="w-full flex flex-col items-center justify-center lg:p-5 gap-y-4 h-full">
      <Banner
        className="col-span-full md:row-start-1 md:row-span-3 md:m-5 md:w-[90%] md:h-96 lg:h-[50vh] overflow-y-scroll hide-scroll-bar scroll-smooth"
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
      <div className="w-full grid grid-cols-2 grid-rows-2 p-1 gap-2 md:grid-cols-3 md:grid-rows-1 lg:h-[40vh] lg:gap-5 place-items-center">
        <Banner
          className="lg:w-2xs lg:p-5 aspect-square overflow-y-scroll hide-scroll-bar scroll-smooth"
          classNameTable="table-fixed"
          title="Precio base"
          headers={["producto", "precio"]}
          keys={["producto", "precio"]}
          data={productsProps}
          sign={{ precio: "$" }}
        />
        <Banner
          className="lg:w-2xs lg:p-5 aspect-square overflow-y-scroll hide-scroll-bar scroll-smooth"
          classNameTable="table-fixed"
          title="Iva"
          headers={["producto", "iva"]}
          keys={["producto", "iva"]}
          data={products}
          sign={{ iva: "$" }}
        />
        <Banner
          className="col-span-full md:col-span-1 lg:w-2xs lg:p-5 aspect-square overflow-y-scroll hide-scroll-bar scroll-smooth"
          classNameTable="table-fixed"
          title="porcentaje"
          headers={["producto", "ganancia"]}
          keys={["producto", "ganancia"]}
          data={products}
          sign={{ ganancia: "$" }}
        />
      </div>
    </section>
  );
}
