import type { FormData, Products } from "../types";

function calculateMetrics(item: FormData): Products {
  const costoNum = Number(item.costo);
  const unidadesNum = Number(item.unidades);
  const porcentajeNum = Number(item.porcentaje) / 100;
  const precio_base = +(costoNum / unidadesNum).toFixed(2);

  let precioPorUnidad = +(
    (costoNum * (1 + porcentajeNum)) /
    unidadesNum
  ).toFixed(2);
  const ganancia = +(costoNum * porcentajeNum).toFixed(2);

  return {
    producto: item.producto,
    costo: costoNum,
    unidades: unidadesNum,
    ganancia,
    precio_base,
    precio_final: precioPorUnidad,
  };
}

export default calculateMetrics;
