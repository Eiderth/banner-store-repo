import Input from "../input/Input";
import "./form.css";
type Props = {
  title: string;
};

export default function Form({ title }: Props) {
  return (
    <form className="form">
      <h1 style={{ gridColumn: "1/-1" }}>{title}</h1>
      <Input
        label="Producto"
        id="producto"
        typeInput="text"
        placeholder="Indique su producto"
      />
      <Input
        label="Gasto total"
        id="inputNumber"
        typeInput="number"
        placeholder="indique el gasto"
      />
    </form>
  );
}
