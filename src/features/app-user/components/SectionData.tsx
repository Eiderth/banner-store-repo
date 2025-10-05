import { useDataContext } from "../../../contexts/DataContext";
import Banner from "../../../components/Banner";
type Props = {};

export default function SectionData({}: Props) {
  const {
    productsProps,
    deleteProduct: handleDelete,
    products,
  } = useDataContext();

  return (
    <section className="max-w-screen p-2 grid grid-cols-2 place-items-center gap-x-2 gap-y-4 md:grid-cols-4 md:grid-rows-3 h-full">
      <Banner
        className="col-span-full md:col-span-2 md:col-start-1"
        title="Datos"
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        data={productsProps}
        onDelete={handleDelete}
      />
      <Banner
        className="md:row-2 md:col-span-1"
        title="porcentaje"
        classNameTable="table-fixed"
        headers={["producto", "ganancia"]}
        keys={["producto", "ganancia"]}
        data={products}
        sign={{ ganancia: "$" }}
      />

      <Banner
        title="Iva"
        classNameTable="table-fixed"
        headers={["producto", "iva"]}
        keys={["producto", "iva"]}
        data={products}
        sign={{ iva: "$" }}
      />
      <Banner
        className="md:col-1 md:row-3"
        title="Precio base"
        classNameTable="table-fixed"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        className="md:col-2 md:row-3"
        title="Precio final"
        classNameTable="table-fixed"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        sign={{ precio: "$$" }}
      />
      <Banner
        className="col-span-full md:col-span-2 md:col-start-3 md:row-start-1 md:row-span-3"
        title="Datos finales"
        headers={["producto", "precio base", "ganancia", "iva", "precio"]}
        keys={["producto", "precio_base", "ganancia", "iva", "precio"]}
        sign={{ iva: "$" }}
        data={products.map((item) => ({
          ...item,
          ganancia: Number((item.ganancia / item.unidades).toFixed(2)),
        }))}
      />
    </section>
  );
}
