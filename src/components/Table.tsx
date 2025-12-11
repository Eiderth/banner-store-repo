import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";
import Btn from "./Btn";
type Props<T, U> = {
  nameTable: string;
  data: T[];
  keysD: (keyof T)[];
  titleFoot?: string;
  footer?: U;
  keysF?: (keyof U)[];
  titleOnClick?: string;
  textButton?: string;
  onClick?: (idx: number) => void;
  iconOnClick?: ReactNode;
  className?: string;
};

export default function Table<
  T extends Record<string, any>,
  U extends Record<string, any>
>({
  nameTable,
  data,
  keysD,
  titleFoot,
  footer,
  keysF,
  titleOnClick,
  textButton,
  onClick,
  iconOnClick,
  className,
}: Props<T, U>) {
  return (
    <table className={twMerge("w-full text-left text-sm", className)}>
      <thead>
        <tr>
          {keysD.map((key) => {
            return (
              <th key={`${nameTable}-thead-${key as string}`} className="py-1">
                {key as string}
              </th>
            );
          })}
          {titleOnClick ? <th className="py-1">{titleOnClick}</th> : ""}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={`${nameTable}-tr-${i}`} className="border-t">
            {keysD.map((key) => {
              return (
                <td key={`${nameTable}-td-${d[key]}`} className="py-2">
                  {d[key]}
                </td>
              );
            })}
            {onClick && (
              <td key={`${nameTable}-td-${titleOnClick}`} className="py-2">
                <Btn
                  className="min-w-9/12 flex justify-center"
                  onClick={() => onClick(i)}
                  text={textButton ?? ""}
                >
                  {iconOnClick}
                </Btn>
              </td>
            )}
          </tr>
        ))}
      </tbody>
      {footer ? (
        <tfoot className="border-t h-10">
          <tr>
            <td className="py-1">{titleFoot}</td>
            {keysF?.map((key) => {
              return (
                <td
                  key={`${nameTable}-tfoot-${key as string}`}
                  className="py-1"
                >
                  {key as string}
                </td>
              );
            })}
          </tr>
        </tfoot>
      ) : (
        ""
      )}
    </table>
  );
}
