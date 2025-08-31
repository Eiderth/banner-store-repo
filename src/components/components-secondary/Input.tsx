import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  className?: string;
};

export default function Input({
  label,
  type,
  id,
  placeholder,
  className,
}: Props) {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        "font-bold font-sans  flex flex-col items-start",
        className
      )}
    >
      <span className={className ? "" : "pl-2.5"}>{label}</span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="rounded-2xl p-2.5 border-4 border-blue-300"
      />
    </label>
  );
}
