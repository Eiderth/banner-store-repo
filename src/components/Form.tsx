import React from "react";
type Props = {
  title: string;
  children?: React.ReactElement[] | React.ReactElement;
};

export default function Form({ title, children }: Props) {
  return (
    <form className="w-fit p-3 border-blue-200 border-4 rounded-2xl grid gap-2 grid-cols-1 md:grid-cols-2">
      <h1 className="col-span-full text-center pb-1 font-extrabold font-sans text-2xl">
        {title}
      </h1>
      {children}
    </form>
  );
}
