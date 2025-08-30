type Props = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  clases?: string;
};

export default function Input({ label, type, id, placeholder, clases }: Props) {
  return (
    <label
      htmlFor={id}
      className={`font-bold font-sans  flex flex-col items-start ${clases}`}
    >
      <span className={clases ? "" : "pl-2.5"}>{label}</span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="rounded-2xl p-2.5 border-4 border-blue-300"
      />
    </label>
  );
}
