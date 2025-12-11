import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";
import type { ComponentProps } from "react";

type Props = {
  text?: string;
  children?: ReactNode;
} & ComponentProps<"button">;

export default function Btn({ text, children, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-red-600 text-white p-2.5 rounded-2xl active:scale-90 transition-transform",
        className
      )}
    >
      {children}
      {text}
    </button>
  );
}
