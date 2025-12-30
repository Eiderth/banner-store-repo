import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Btn from "./Btn";

type Props<T> = {
  data: T;
  keys: (keyof T)[];
  headers: string[];
  rowView: number;
  signs?: string[];
};

export default function TableCard<T extends Record<string, any>>({
  data,
  keys,
  headers,
  rowView,
  signs,
}: Props<T>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <table className="w-full text-left flex items-center gap-1 text-sm py-5 border-t relative">
        <thead>
          <tr className="flex flex-col">
            {headers.map((head, i) => {
              if (i <= rowView - 1) {
                return (
                  <th key={`th-${i}`} className="py-1 pr-1 text-nowrap">
                    {head}
                  </th>
                );
              } else if (expanded === true) {
                return (
                  <th key={`th-${i}`} className="py-1 pr-1 text-nowrap">
                    {head}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col">
            {keys.map((key, i) => {
              if (i <= rowView - 1) {
                return (
                  <td key={`td-${i}`} className="py-1 pr-1 text-nowrap">
                    {data[key]} {signs?.[i] ?? ""}
                  </td>
                );
              } else if (expanded) {
                return (
                  <td key={`td-${i}`} className="py-1 pr-1">
                    {data[key]} {signs?.[i] ?? ""}
                  </td>
                );
              }
            })}
          </tr>
        </tbody>
        <Btn
          className="bg-yellow-400 h-fit absolute top-1 right-1"
          onClick={() => setExpanded(!expanded)}
        >
          <IconChevronDown className={`${expanded && "rotate-180"}`} />
        </Btn>
      </table>
    </>
  );
}
