import { twMerge } from "tailwind-merge";

const defaultSign = {
  iva: "",
  precio_base: "$",
  precio: "$",
  costo: "$",
  porcentaje: "%",
  ganancia: "$",
};

type Props<T> = {
  headers: string[];
  keys: (keyof T)[];
  data: T[];
  title: string;
  sign?: Partial<typeof defaultSign>;
  className?: string;
  classNameTable?: string;
  onDelete?: (index: number) => void;
};

export default function Banner<T extends Record<string, any>>({
  headers,
  keys,
  data,
  title,
  sign,
  className,
  classNameTable,
  onDelete,
}: Props<T>) {
  const finalSign = { ...defaultSign, ...sign };

  return (
    <div
      className={twMerge(
        `box-border w-full h-full rounded-3xl flex flex-col gap-2 border-4 border-blue-400 p-1 text-nowrap md:gap-y-5 ${
          data.length === 0 && "hidden"
        }`,
        className
      )}
    >
      <h2 className="text-center font-bold text-md md:text-2xl">{title}</h2>
      <table
        className={twMerge(
          "w-full border-separate border-spacing-0.5 border-spacing-y-1.5",
          classNameTable
        )}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-0.5 text-[10px] font-medium text-balance text-center"
              >
                {header === "porcentaje" ? "%" : header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((props, keyRow) => (
            <tr key={keyRow}>
              {keys.map((key) => (
                <td
                  key={`${String(key)}-${keyRow}`}
                  className="text-center font-medium text-xs"
                >
                  {typeof props[key] === "boolean"
                    ? props[key]
                      ? "Si"
                      : "No"
                    : `${String(props[key])}${
                        finalSign[key as keyof typeof finalSign] ?? ""
                      }`}
                </td>
              ))}
              {onDelete && (
                <td>
                  <button
                    type="button"
                    key={`button-${keyRow}`}
                    onClick={() => onDelete(keyRow)}
                    className="bg-red-600 text-white rounded-2xl p-1 max-w-full"
                  >
                    Borrar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
