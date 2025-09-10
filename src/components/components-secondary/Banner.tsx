import type { products } from "../Aplication";

type Props = {
  headers: (keyof products)[];
  data?: products[];
};

export default function Banner({ headers, data }: Props) {
  return (
    <table className="table-fixed rounded-3xl border-4 border-separate border-spacing-0 border-blue-400 p-1">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="p-0.5 text-xs font-bold text-balance break-words text-center md:p-2"
            >
              {header.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((props, keyRow) => (
          <tr key={keyRow}>
            {headers.map((key) => (
              <td key={`${key}-${keyRow}`} className="text-center">
                {typeof props[key] === "boolean"
                  ? props[key]
                    ? "Si"
                    : "No"
                  : props[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
