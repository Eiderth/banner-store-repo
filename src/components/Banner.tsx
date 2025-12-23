import { twMerge } from "tailwind-merge";
import { forwardRef, type ReactElement, cloneElement } from "react";
const defaultSign = {
  iva: "",
  precio_base: "$",
  precio: "$",
  costo: "$",
  porcentaje: "%",
  ganancia: "$",
};

type Props<T> = {
  children?: ReactElement<{ className?: string }>;
  headers: string[];
  keys: (keyof T)[];
  data: T[];
  title: string;
  sign?: Partial<typeof defaultSign>;
  className?: string;
  classNameTable?: string;
};

const Banner = forwardRef<HTMLDivElement, Props<Record<string, any>>>(
  (
    { children, headers, keys, data, title, sign, className, classNameTable },
    ref
  ) => {
    const finalSign = { ...defaultSign, ...sign };

    const cloneChildren = children
      ? cloneElement(children, {
          className: `${children.props.className} absolute bottom-2 right-2  md:scale-125`,
        })
      : "";

    return (
      <div
        ref={ref}
        className={twMerge(
          `box-border w-full relative rounded-3xl border-4 bg-gray-50 border-blue-400 p-1 px-5
          ${data.length === 0 && "hidden"}`,
          className
        )}
      >
        <h2 className="text-center font-bold md:text-3xl w-full self-center">
          {title}
        </h2>
        {cloneChildren}
        <div className="hide-scroll-bar scroll-smooth overflow-y-scroll max-h-80">
          <table
            className={twMerge(
              "w-full border-separate border-spacing-0.5 border-spacing-y-1.5 md:border-spacing-2 text-nowrap",
              classNameTable
            )}
          >
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="p-0.5 pb-3 text-xs font-medium text-balance text-center md:text-base"
                  >
                    {header === "porcentaje" ? "%" : header.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((props, keyRow) => (
                <tr key={keyRow} className="mt-10">
                  {keys.map((key) => (
                    <td className="font-medium text-xs md:text-lg first:pl-5 first:text-left text-center">
                      {`${String(props[key])} ${
                        finalSign[key as keyof typeof finalSign] ?? ""
                      }`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

export default Banner;
