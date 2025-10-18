import Banner from "../../../components/Banner";
import { useContext } from "react";
import { Context } from "../../../contexts/Contex";
type Props = {};

export default function SectionBanner({}: Props) {
  const { products } = useContext(Context);
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <Banner
        title="Precios"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        className="w-[70%] min-h-60 max-h-full"
        classNameTable="table-fixed lg:border-spacing-y-5"
      ></Banner>
    </section>
  );
}
