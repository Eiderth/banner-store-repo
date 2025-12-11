import { useContext } from "react";
import { Context } from "../../../contexts/Contex";
import Table from "../../../components/Table";
import { IconTrash } from "@tabler/icons-react";
type Props = {
  id: string;
};

export default function SectionData({ id }: Props) {
  const { productsProps, deleteProduct } = useContext(Context);
  return (
    <section id={id} className="w-full min-h-[400px] p-6 scroll-smooth">
      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          className="table-fixed"
          data={productsProps}
          nameTable="Edition-Table"
          keysD={[
            "producto",
            "costo",
            "unidades",
            "porcentaje",
            "iva",
            "precio",
          ]}
          onClick={deleteProduct}
          iconOnClick={<IconTrash />}
        />
      </div>
    </section>
  );
}
