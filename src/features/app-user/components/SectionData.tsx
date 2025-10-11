import Banner from "../../../components/Banner";
import { useDataContext } from "../../../contexts/DataContext";

type Props = {};

export default function SectionData({}: Props) {
  const { productsProps, deleteProduct } = useDataContext();
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <Banner
        className="w-[60%] h-[70%] overflow-y-auto scroll-smooth hide-scroll-bar"
        classNameTable="table-fixed"
        data={productsProps}
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        title="Datos"
        onDelete={deleteProduct}
      />
    </section>
  );
}
