import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type Props = {
  label: string;
  className?: string;
  classNameInput?: string;
} & ComponentProps<"input">;

export default function Input({
  label,
  className,
  classNameInput,
  ...props
}: Props) {
  return (
    <label
      htmlFor={props.id}
      className={twMerge(
        "font-bold font-sans  flex flex-col items-start",
        className
      )}
    >
      <span className={className ? "" : "pl-2.5"}>{label}</span>
      <input
        {...props}
        className={twMerge(
          "rounded-2xl p-2.5 border-4 border-blue-300 w-full",
          classNameInput
        )}
      />
    </label>
  );
}
