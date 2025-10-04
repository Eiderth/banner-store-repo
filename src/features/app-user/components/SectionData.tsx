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
    <section className="max-w-screen min-h-fit h-fit p-2 grid grid-cols-2 place-items-center gap-x-2 gap-y-4">
      <Banner
        className="col-span-full"
        title="Datos"
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        data={productsProps}
        onDelete={handleDelete}
      />
      <Banner
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
        title="Precio base"
        classNameTable="table-fixed"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        title="Precio final"
        classNameTable="table-fixed"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        sign={{ precio: "$$" }}
      />
      <Banner
        className="col-span-full"
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
