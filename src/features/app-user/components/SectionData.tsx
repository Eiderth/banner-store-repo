import Banner from "../../../components/Banner";
import { useDataContext } from "../../../contexts/DataContext";

type Props = {};

export default function SectionData({}: Props) {
  const { productsProps, deleteProduct } = useDataContext();
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-2">
      <Banner
        className="w-full md:w-[80%] md:p-2.5 min-h-60 max-h-full"
        classNameTable="md:border-spacing-2"
        data={productsProps}
        headers={["producto", "costo", "unidades", "porcentaje", "iva"]}
        keys={["producto", "costo", "unidades", "porcentaje", "iva"]}
        title="Datos"
        onDelete={deleteProduct}
      />
    </section>
  );
}
