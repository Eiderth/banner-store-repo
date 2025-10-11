import Banner from "../../../components/Banner";
import { useDataContext } from "../../../contexts/DataContext";
type Props = {};

export default function SectionBanner({}: Props) {
  const { products } = useDataContext();
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <Banner
        title="Precios"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        className="w-[70%] h-fit"
        classNameTable="table-fixed lg:border-spacing-y-5"
      ></Banner>
    </section>
  );
}
