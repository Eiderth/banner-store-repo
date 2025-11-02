import type { ChangeEvent, ComponentProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  children?: ReactElement;
  label: string;
  options: string[];
  classNameLabel?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
} & ComponentProps<"select">;

export default function Select({
  children,
  label,
  options,
  classNameLabel,
  onChange,
  ...props
}: Props) {
  return (
    <label
      htmlFor={props.id}
      className={twMerge(
        "w-full h-full rounded-2xl bg-amber-50 border-2 border-amber-300 p-2.5 active:bg-amber-400",
        classNameLabel
      )}
    >
      {children}
      <span className="inline">{label}</span>
      <select className="block pt-2 w-full" {...props} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
