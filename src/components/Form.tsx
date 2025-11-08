import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  title: string;
  children?: React.ReactElement[] | React.ReactElement;
  className?: string;
  classNameTitle?: string;
};

export default function Form({
  title,
  children,
  className,
  classNameTitle,
}: Props) {
  return (
    <form
      className={twMerge(
        "w-fit p-3 border-blue-300 border-4 rounded-2xl grid gap-2 grid-cols-1 md:grid-cols-2 md:gap-4 md:p-3",
        className
      )}
    >
      <h1
        className={twMerge(
          "col-span-full text-center pb-1 font-extrabold font-sans md:text-3xl md:pb-2.5",
          classNameTitle
        )}
      >
        {title}
      </h1>
      {children}
    </form>
  );
}
