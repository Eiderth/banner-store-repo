import "./input.css";
type Props = {
  placeholder: string;
  label: string;
  id: string;
  typeInput: string;
};

export default function Input({ placeholder, label, id, typeInput }: Props) {
  return (
    <div className="container-input">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={typeInput}
        className="input"
        placeholder={placeholder}
      ></input>
    </div>
  );
}
