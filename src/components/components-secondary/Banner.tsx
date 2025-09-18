import { twMerge } from "tailwind-merge";

const signInitial = { iva: "", precio: "", costo: "", porcentaje: "" };
type sign = {
  iva?: string;
  costo?: string;
  precio?: string;
  porcentaje?: string;
};

type Props<T> = {
  headers: (keyof T)[];
  data: T[];
  title: string;
  sign?: sign;
  className?: string;
  classNameTable?: string;
  onDelete?: (index: number) => void;
};

export default function Banner<T extends Record<string, any>>({
  headers,
  data,
  title,
  sign = signInitial,
  className,
  classNameTable,
  onDelete,
}: Props<T>) {
  const finalSign = { ...signInitial, ...sign };
  const { iva, precio = "$", costo = "$", porcentaje = "%" } = finalSign;

  return (
    <div
      className={twMerge(
        `box-border rounded-3xl flex flex-col gap-2 border-4  border-blue-400 p-1.5 sm:p-2.5 transition-all max-w-full h-full ${
          data.length === 0 && "hidden"
        }`,
        className
      )}
    >
      <h2 className="text-center font-bold text-2xl">{title}</h2>
      <table
        className={twMerge(
          "w-full border-separate border-spacing-1 sm:border-spacing-2 max-w-full",
          classNameTable
        )}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header as string} // Hacemos un type assertion aquí
                className="p-0.5 text-xs font-bold text-balance break-words text-center md:p-2"
              >
                {header === "porcentaje"
                  ? "%"
                  : (header as string).toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((props, keyRow) => (
            <tr key={keyRow}>
              {headers.map((key) => (
                <td
                  key={`${String(key)}-${keyRow}`}
                  className="text-center font-semibold text-xs"
                >
                  {/* Ahora 'props[key]' es seguro porque T[keyof T] es válido */}
                  {typeof props[key] === "boolean"
                    ? props[key]
                      ? "Si"
                      : "No"
                    : String(props[key])}
                  {(key === "iva" && iva) ||
                    (key === "costo" && `${costo}`) ||
                    (key === "precio" && `${precio}`) ||
                    (key === "porcentaje" && `${porcentaje}`)}
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
