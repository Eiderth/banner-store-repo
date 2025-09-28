import { useDataContext } from "../../contexts/DataContext";
import FormProduct from "./FormProduct";
type Props = {};

export default function SectionForm({}: Props) {
  const { setProductsProps } = useDataContext();

  return (
    <section className="max-w-screen min-h-screen p-1 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 place-items-center gap-5">
      <div className="col-span-full">
        <FormProduct onClick={setProductsProps} />
      </div>
    </section>
  );
}
