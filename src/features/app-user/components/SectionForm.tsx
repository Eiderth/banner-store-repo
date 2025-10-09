import { useDataContext } from "../../../contexts/DataContext";
import FormProduct from "./FormProduct";
type Props = {};

export default function SectionForm({}: Props) {
  const { setProductsProps } = useDataContext();

  return (
    <section className="w-screen h-full flex flex-col items-center justify-center p-2">
      <FormProduct onClick={setProductsProps} />
    </section>
  );
}
