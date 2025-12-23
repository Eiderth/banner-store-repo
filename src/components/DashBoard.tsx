import { useMemo } from "react";
import { IconArrowRampRight2 } from "@tabler/icons-react";
import { type Data } from "../app-user/components/SectionDashBoard";
import type { Products } from "../types";
type Props = {
  onClick: () => void;
  data: Data;
  productsSort: Products[];
};

const colors = {
  color1: "blue",
  color2: "#01AB18",
};
export default function DashBoard({ onClick, data, productsSort }: Props) {
  const porcents = useMemo(() => {
    if (data.ingresos !== 0)
      return {
        ingresos: +((data.ingresos / data.ingresos) * 100).toFixed(2) + "%",
        invertido: +((data.invertido / data.ingresos) * 100).toFixed(2) + "%",
        ganancias: +((data.ganancias / data.ingresos) * 100).toFixed(2) + "%",
      };
    else
      return {
        ingresos: "0%",
        invertido: "0%",
        ganancias: "0%",
      };
  }, [data]);

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-500">Resumen rápido</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Cant Productos</p>
          <p className="text-2xl font-bold">{productsSort.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-2xl font-bold">${data.ingresos}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Ganancias</p>
          <p className="text-2xl font-bold">${data.ganancias}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Tasa de ganancia</p>
          <p className="text-2xl font-bold">+ {porcents.ganancias}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 mb-2">
            Relacion Ingresos/Ganancias
          </h3>
          <div className="flex flex-col md:flex-row gap-5">
            <svg className="shadow" height="250" viewBox="0 0 200 200">
              <circle
                r={70}
                cx="50%"
                cy="50%"
                fill="none"
                stroke={colors.color1}
                strokeWidth={30}
                strokeDashoffset={0}
                pathLength={data.ingresos}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
              {data.ganancias < 1 ? (
                ""
              ) : (
                <circle
                  r={70}
                  cx="50%"
                  cy="50%"
                  fill="none"
                  stroke={colors.color2}
                  strokeWidth={30}
                  strokeDasharray={`${data.ganancias} ${
                    data.ingresos - data.ganancias
                  }`}
                  strokeDashoffset={-(data.ingresos - data.ganancias)}
                  pathLength={data.ingresos}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              )}

              <text x="50%" y="50%" textAnchor="middle" fontWeight="bold">
                Ganancias
                <tspan x="50%" dy="1.2em">
                  {porcents.ganancias}
                </tspan>
              </text>
            </svg>

            <div className="w-full p-2.5 flex flex-col justify-center gap-5">
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Ingresos totales : {porcents.ingresos}
                </strong>
                <div className="w-3/4 h-8  rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2  -translate-x-2/4 font-bold">
                    {data.ingresos}$
                  </span>
                  <div
                    className="h-full bg-yellow-300"
                    style={{
                      width: porcents.ingresos,
                    }}
                  />
                </div>
              </div>
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Invertido : {porcents.invertido}
                </strong>
                <div className="w-3/4 h-8 rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2 -translate-x-2/4 font-bold">
                    {data.invertido}$
                  </span>
                  <div
                    className="h-full  bg-blue-600"
                    style={{
                      width: porcents.invertido,
                    }}
                  />
                </div>
              </div>
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Ganacias :{porcents.ganancias}
                </strong>
                <div className="w-3/4 h-8 rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2 -translate-x-2/4 font-bold">
                    {data.ganancias}$
                  </span>

                  <div
                    className="h-full  bg-green-500 "
                    style={{
                      width: porcents.ganancias,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow relative">
          <button
            className="absolute top-2.5 right-5 transition rounded-b-sm shadow hover:scale-120"
            onClick={onClick}
          >
            <IconArrowRampRight2 />
          </button>
          <h3 className="text-sm text-gray-600 mb-2">
            Productos con mayor ganancia
          </h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-1">Producto</th>
                <th className="py-1">Costo</th>
                <th className="py-1">Ingreso</th>
                <th className="py-1">Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {productsSort.slice(0, 6).map((product, i) => (
                <tr key={`${product.producto}--${i}`} className="border-t">
                  <td className="py-2">{product.producto}</td>
                  <td className="py-2">{product.costo}</td>
                  <td className="py-2">{product.costo + product.ganancia}</td>
                  <td className="py-2">{product.ganancia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
