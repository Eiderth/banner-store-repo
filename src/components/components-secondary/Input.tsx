import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type Props = {
  className?: string;
  classNameInput?: string;
} & ComponentProps<"input">;

export default function Input({ className, classNameInput, ...props }: Props) {
  return (
    <label
      htmlFor={props.id}
      className={twMerge(
        "font-bold font-sans  flex flex-col items-start",
        className
      )}
    >
      <span className={"pl-2.5"}>{props.id}</span>
      <input
        {...props}
        className={twMerge(
          "rounded-2xl p-2.5 border-4 border-blue-300 w-full focus:border-violet-600 focus:outline-0 transition-colors  invalid:focus:border-red-600 invalid:focus:text-red-600",
          classNameInput
        )}
      />
    </label>
  );
}
