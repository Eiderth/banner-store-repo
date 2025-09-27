import FormProduct from "./FormProduct";
import type { FormData } from "../../types";
type Props = {
  handleClick: (data: Omit<FormData, "precio">) => void;
};

export default function SectionForm({ handleClick }: Props) {
  return (
    <section className="max-w-screen min-h-screen p-1 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 place-items-center gap-5">
      <div className="col-span-full">
        <FormProduct onClick={handleClick} />
      </div>
    </section>
  );
}
