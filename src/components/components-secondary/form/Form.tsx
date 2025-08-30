type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function Form({ title, children }: Props) {
  return (
    <form className="w-fit p-4 border-blue-200 border-4 rounded-2xl grid gap-1.5 grid-cols-2">
      <h1 className="col-span-full text-center pb-2">{title}</h1>
      {children}
    </form>
  );
}
