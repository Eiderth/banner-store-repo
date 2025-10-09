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
    <section className="w-screen flex flex-col items-center p-2 gap-y-4 md:gap-y-8 h-full pb-8">
      <h1>Holaa</h1>
      <Banner
        className="col-span-full md:row-start-1 md:row-span-3 md:m-5 md:w-[90%] md:h-96 lg:h-[65vh]"
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
        className="md:w-[70%] md:h-fit md: lg:h-[50vh]"
        title="Datos"
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        data={productsProps}
        onDelete={handleDelete}
      />
      <div className="w-full grid grid-cols-2 grid-rows-2 p-1 gap-2 md:grid-cols-3 md:grid-rows-1 lg:h-[40vh] place-items-center">
        <Banner
          title="Precio base"
          // classNameTable="table-fixed"
          headers={["producto", "precio"]}
          keys={["producto", "precio"]}
          data={productsProps}
          sign={{ precio: "$" }}
        />
        <Banner
          title="Iva"
          // classNameTable="table-fixed"
          headers={["producto", "iva"]}
          keys={["producto", "iva"]}
          data={products}
          sign={{ iva: "$" }}
        />
        <Banner
          className="col-span-full md:col-span-1"
          title="porcentaje"
          // classNameTable="table-fixed"
          headers={["producto", "ganancia"]}
          keys={["producto", "ganancia"]}
          data={products}
          sign={{ ganancia: "$" }}
        />
      </div>
    </section>
  );
}
