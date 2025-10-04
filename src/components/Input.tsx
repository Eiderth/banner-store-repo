import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type Props = {
  className?: string;
  classNameInput?: string;
  invalid?: boolean;
  label: string;
} & ComponentProps<"input">;

export default function Input({
  className,
  classNameInput,
  invalid,
  label,
  ...props
}: Props) {
  return (
    <label
      htmlFor={props.id}
      className={twMerge(
        "font-bold font-sans flex flex-col items-start",
        className
      )}
    >
      <span className={"pl-2.5 md:text-2xl"}>{label}</span>
      <input
        {...props}
        className={twMerge(
          `rounded-2xl p-2.5 border-4 border-blue-300 w-full outline-0 transition-colors md:placeholder:text-xl md:p-5 ${
            invalid ? "border-red-500" : ""
          }`,
          classNameInput
        )}
      />
    </label>
  );
}
