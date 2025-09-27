import Banner from "./Banner";
import type { Products, FormData } from "../../types";
type Props = {
  productsProps: FormData[];
  products: Products[];
  handleDelete: (indexToDelete: number) => void;
};

export default function SectionData({
  products,
  productsProps,
  handleDelete,
}: Props) {
  return (
    <section className="max-w-screen min-h-screen p-1 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 place-items-center gap-5">
      <Banner
        className="p-1 col-span-full max-w-full"
        classNameTable="border-spacing-1"
        title="Datos"
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        data={productsProps}
        onDelete={handleDelete}
      />
      <Banner
        title="porcentaje"
        headers={["producto", "ganancia"]}
        keys={["producto", "ganancia"]}
        data={products}
        sign={{ ganancia: "$" }}
      />

      <Banner
        title="Iva"
        headers={["producto", "iva"]}
        keys={["producto", "iva"]}
        data={products}
        sign={{ iva: "$" }}
      />
      <Banner
        title="Precio base"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={productsProps}
        sign={{ precio: "$" }}
      />
      <Banner
        title="Precio final"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        sign={{ precio: "$$" }}
      />
      <Banner
        className="col-span-full"
        title="Preio Final"
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
