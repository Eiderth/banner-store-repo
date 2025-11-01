import type { ComponentProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactElement;
  label: string;
  classNameLabel?: string;
} & ComponentProps<"input">;

export default function InputIcon({
  children,
  label,
  classNameLabel,
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
      <input {...props} />
    </label>
  );
}
