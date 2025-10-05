import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

type Props = {
  text: string;
} & ComponentProps<"button">;

export default function Btn({ text, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-red-600 text-white p-2.5 rounded-2xl active:scale-90 transition-transform md:text-2xl md:p-5",
        className
      )}
    >
      {text}
    </button>
  );
}
