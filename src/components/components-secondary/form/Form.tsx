type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function Form({ title, children }: Props) {
  return (
    <form className="w-fit p-4 border-blue-200 border-4 rounded-2xl grid gap-3 grid-cols-1 md:grid-cols-2  ">
      <h1 className="col-span-full text-center pb-3 font-extrabold font-sans text-2xl">
        {title}
      </h1>
      {children}
    </form>
  );
}
