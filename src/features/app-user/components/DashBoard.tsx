import { useContext, useMemo } from "react";
import { Context } from "../../../contexts/Contex";
type Props = { id: string };

const colors = {
  color1: "blue",
  color2: "#01AB18",
};
export default function DashBoard({ id }: Props) {
  const { products } = useContext(Context);

  const data = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const ingreso = product.precio * product.unidades;
        const ganancia = product.ganancia;
        acc.ingresos += ingreso;
        acc.ganancias += ganancia;
        acc.invertido += ingreso - ganancia;
        return acc;
      },
      { ingresos: 0, ganancias: 0, invertido: 0 }
    );
  }, [products]);

  return (
    <section id={id} className="w-full min-h-[400px] p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-500">Resumen rápido</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Cant Productos</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-2xl font-bold">${data.ingresos.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Ganancias</p>
          <p className="text-2xl font-bold">${data.ganancias.toFixed(0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Tasa de ganancia</p>
          <p className="text-2xl font-bold">
            + %{((data.ganancias / data.ingresos) * 100).toFixed(2)}
          </p>
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
                strokeDasharray={`${data.ingresos} ${data.ingresos}`}
                strokeDashoffset={0}
                pathLength={data.ingresos}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  animation: "ease-out",
                }}
              />
              <circle
                r={70}
                cx="50%"
                cy="50%"
                fill="none"
                stroke={colors.color2}
                strokeWidth={30}
                strokeDasharray={`${data.ganancias} ${data.ingresos}`}
                strokeDashoffset={-data.ingresos}
                pathLength={data.ingresos + data.ganancias}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
              <text x="50%" y="50%" textAnchor="middle" fontWeight="bold">
                Ganancias
                <tspan x="50%" dy="1.2em">
                  {((data.ganancias / data.ingresos) * 100).toFixed(2)}%
                </tspan>
              </text>
            </svg>
            <div className="w-full p-2.5 flex flex-col justify-center gap-5">
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Ingresos totales : {data.ingresos.toFixed(2)}
                </strong>
                <div className="w-3/4 h-8  rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2  -translate-x-2/4 font-bold">
                    100%
                  </span>
                  <div
                    className="h-full bg-yellow-300"
                    style={{
                      width: `${(data.ingresos / data.ingresos) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Invertido : {data.invertido.toFixed(2)}
                </strong>
                <div className="w-3/4 h-8 rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2 -translate-x-2/4 font-bold">
                    {((data.invertido / data.ingresos) * 100).toFixed(2)}%
                  </span>
                  <div
                    className="h-full  bg-blue-600"
                    style={{
                      width: `${(data.invertido / data.ingresos) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <strong className="text-sm text-gray-600 ml-2.5">
                  Ganacias : {data.ganancias.toFixed(2)}
                </strong>
                <div className="w-3/4 h-8 rounded-3xl shadow overflow-hidden relative">
                  <span className="absolute left-1/2 -translate-x-2/4 font-bold">
                    {((data.ganancias / data.ingresos) * 100).toFixed(2)}%
                  </span>

                  <div
                    className="h-full  bg-green-500 "
                    style={{
                      width: `${(data.ganancias / data.ingresos) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 mb-2">Productos</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-1">Producto</th>
                <th className="py-1">Costo</th>
                <th className="py-1">Unidades</th>
                <th className="py-1">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={`${product.producto}--${i}`} className="border-t">
                  <td className="py-2">{product.producto}</td>
                  <td className="py-2">{product.costo}</td>
                  <td className="py-2">{product.unidades}</td>
                  <td className="py-2">{product.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
