import type { ReactNode } from "react";

type Props = {
  headers: string[];
  data?: Record<string, ReactNode>[];
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
        {data?.map((object, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((headerKey) => (
              <td key={`${rowIndex}-${headerKey}`} className="p-2 text-center">
                {object[headerKey.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
