import Banner from "../../../components/Banner";
import { useContext } from "react";
import { Context } from "../../../contexts/Contex";

type Props = {
  id: string;
};

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct } = useContext(Context);
  return (
    <section
      id={id}
      className="w-full h-full flex flex-col items-center justify-center p-2"
    >
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
